const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");

const dbConnection = require("../config/dbConnection.js");

const randomstring = require("randomstring");
const sendMail = require("../services/sendMail.js");

const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

const register = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  dbConnection.query(
    "SELECT * FROM users WHERE email = $1",
    [req.body.email],
    (err, result) => {
      //if database error
      if (err) {
        console.error(err);
        return res.status(400).send({
          message: err,
        });
      }

      //if user already exists
      if (result.rows.length > 0) {
        return res.status(400).send({
          message: "This user already exists!",
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            console.error(err);
            return res.status(500).send({
              message: "Internal Server Error",
            });
          } else {
            let role = req.body.is_admin == "admin" ? 1 : 0;
            const insertQuery =
              "INSERT INTO users (name, email, password, is_admin) VALUES ($1, $2, $3, $4)";
            const values = [req.body.name, req.body.email, hash, role];

            dbConnection.query(insertQuery, values, (err, result) => {
              if (err) {
                console.error(err);
                return res.status(400).send({
                  message: err,
                });
              }

              //mail
              let mailSubject = "mail verification";
              const randomToken = randomstring.generate();
              let content = `<p>Hi ${req.body.name},</p><br><p>Click below link to verify your email</p><p><a href="http://localhost:8000/mail-verification?token=${randomToken}">verify email</a></p>`;

              sendMail(req.body.email, mailSubject, content, (mailError) => {
                if (mailError) {
                  console.error(mailError);
                  return res.status(500).send({
                    message: "Error sending verification email",
                  });
                }
              });

              dbConnection.query(
                "UPDATE users SET token = $1 WHERE email = $2",
                [randomToken, req.body.email],
                (err, result) => {
                  if (err) {
                    console.log(err);
                    return res.status(400).send({
                      message: err,
                    });
                  }
                }
              );

              return res.status(201).send({
                message: "User registered successfully!!",
              });
            });
          }
        });
      }
    }
  );
};

const verifyMail = (req, res) => {
  const token = req.query.token;

  dbConnection.query(
    "select * from users where token=$1",
    [token],
    (err, result, fields) => {
      if (err) {
        console.log(err);
      }
      if (result.rows.length > 0) {
        dbConnection.query(
          "UPDATE users SET token = null, is_verified=1 WHERE id = $1",
          [result.rows[0].id]
        );
        return res.redirect("http://localhost:5173/verify");
      } else {
        return res.redirect("http://localhost:5173/not-found");
      }
    }
  );
};

const login = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  dbConnection.query(
    `SELECT * FROM users WHERE email = $1`,
    [req.body.email],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(400).send({
          message: err,
        });
      }

      if (!result.rows.length) {
        return res.status(401).send({
          message: "User not found",
        });
      }

      bcrypt.compare(
        req.body.password,
        result.rows[0].password,
        (berr, passwordMatch) => {
          if (berr) {
            return res.status(400).send({
              message: berr,
            });
          }

          if (!passwordMatch) {
            return res.status(401).send({
              message: "Incorrect password",
            });
          }

          if (
            passwordMatch &&
            result.rows[0].is_verified == 1 &&
            result.rows[0].is_disabled == 0
          ) {
            const token = jwt.sign(
              { id: result.rows[0].id, is_admin: result.rows[0].is_admin },
              JWT_SECRET,
              { expiresIn: "1h" }
            );

            res.cookie("jwt", token, {
              httpOnly: true,
              secure: process.env.NODE_ENV !== "development",
              sameSite: "strict",
              maxAge: 30 * 24 * 60 * 60 * 1000,
            });

            console.log(req.cookies);

            dbConnection.query(
              "UPDATE users SET last_login=now() WHERE id = $1",
              [result.rows[0].id]
            );

            var userInfo = {
              id: result.rows[0].id,
              name: result.rows[0].name,
              email: result.rows[0].email,
              is_admin: result.rows[0].is_admin == 0 ? "user" : "admin",
            };

            return res.status(200).send({
              message: "Login successful",
              token: token,
              data: userInfo,
            });
          }

          if (passwordMatch && result.rows[0].is_verified == 0) {
            return res.status(401).send({
              message: "Please verify your email",
            });
          }

          if (passwordMatch && result.rows[0].is_disabled == 1) {
            return res.status(401).send({
              message: "User is disabled. Please contact the administrator.",
            });
          }

          console.log("email wrong");
          return res.status(401).send({
            message: "Email or Password is incorrect",
          });
        }
      );
    }
  );
};

const logOut = (req, res) => {
  if (!req.cookies) {
    return res.status(400).send({ message: "Please login" });
  }

  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  return res
    .status(200)
    .send({ success: true, message: "Logged out successfully" });
};

const getUser = (req, res) => {
  const authToken = req.cookies.jwt;

  try {
    const decode = jwt.verify(authToken, JWT_SECRET);

    dbConnection.query(
      `SELECT * FROM users WHERE id=$1`,
      [decode.id],
      (err, result) => {
        if (err) {
          console.error(err);
          return res
            .status(500)
            .send({ success: false, message: "Internal Server Error" });
        }

        var userInfo = {
          id: result.rows[0].id,
          name: result.rows[0].name,
          email: result.rows[0].email,
          is_admin: result.rows[0].is_admin == 0 ? "user" : "admin",
        };

        if (
          result.rows.length > 0 &&
          result.rows[0].is_verified == 1 &&
          result.rows[0].is_disabled == 0
        ) {
          return res.status(200).send({
            success: true,
            data: userInfo,
            message: "Fetched successfully!!",
          });
        }
        if (result.rows.length > 0 && result.rows[0].is_verified == 0) {
          return res.status(401).send({
            message: "Please verify your email",
          });
        }
        if (result.rows.length > 0 && result.rows[0].is_disabled == 1) {
          return res.status(401).send({
            message: "User is disabled. Please contact the administrator.",
          });
        }
        return res.status(404).send({
          success: false,
          message: "User not found/account not verified",
        });
      }
    );
  } catch (error) {
    return res.status(401).send({ success: false, message: "Invalid token" });
  }
};

const getAllUsers = (req, res) => {
  dbConnection.query("SELECT * FROM users ORDER BY id ASC", (err, result) => {
    if (err) {
      console.log("error");
      console.log(err);
      return res
        .status(500)
        .send({ success: false, message: "Internal Server Error" });
    }
    console.log(result.rows);
    if (result.rows.length > 0) {
      return res.status(200).json(result.rows);
    }
    return res.status(200).json({ message: "No users found" });
  });
};

const getEmailFromResetPassword = (req, res) => {
  var token = req.headers.authorization;

  token = token.split(" ")[1];

  if (!token) {
    return res.redirect("http://localhost:5173/not-found");
  }

  dbConnection.query(
    `SELECT * FROM password_resets WHERE token = $1`,
    [token],
    (err, result, fields) => {
      if (err) {
        console.log(err);
      }
      email = result.rows[0].email;
      if (result.rows.length > 0) {
        return res.status(200).json({ message: "success", email: email });
      } else {
        return res.status(404).json({ message: "not found" });
      }
    }
  );
};

const disableUser = (req, res) => {
  var token = req.headers.authorization;

  token = token.split(" ")[1];

  if (!token) {
    return res.redirect("http://localhost:5173/not-found");
  }
  console.log(token);
  try {
    console.log("try");
    const decode = jwt.verify(token, JWT_SECRET);
    console.log("decode");

    dbConnection.query(
      `SELECT * FROM users WHERE id=$1`,
      [decode.id],
      (err, result) => {
        if (err) {
          return res
            .status(500)
            .send({ success: false, message: "Internal Server Error" });
        }

        console.log(result.rows);

        var userInfo = {
          id: result.rows[0].id,
          name: result.rows[0].name,
          email: result.rows[0].email,
          is_admin: result.rows[0].is_admin == 0 ? "user" : "admin",
        };

        if (result.rows.length > 0) {
          if (result.rows[0].is_admin == 0) {
            dbConnection.query("delete from users where id = $1", [
              result.rows[0].id,
            ]);
            return res.status(200).json({
              success: true,
              data: userInfo,
              message: "Disabled and deleted the account successfully!!",
            });
          }

          if (result.rows[0].is_disabled == 1) {
            return res
              .status(404)
              .send({ success: false, message: "User already disabled" });
          }

          res.cookie("jwt", "", {
            httpOnly: true,
            expires: new Date(0),
          });
          return res.status(200).json({
            success: true,
            data: userInfo,
            message: "Disabled successfully!!",
          });
        } else {
          return res
            .status(404)
            .send({ success: false, message: "User not found" });
        }
      }
    );
  } catch (error) {
    return res.status(401).send({ success: false, message: "Invalid token" });
  }
};

const disableUserById = (req, res) => {
  const id = req.body.id;
  console.log("id:" + id);

  dbConnection.query("SELECT * FROM users WHERE id=$1", [id], (err, result) => {
    if (err) {
      console.error(err);
      return res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }

    console.log(result.rows.length);

    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const user = result.rows[0];

    if (user.is_disabled === 1) {
      return res
        .status(400)
        .json({ success: false, message: "User already disabled" });
    }

    dbConnection.query(
      "UPDATE users SET is_disabled=1 WHERE id = $1",
      [user.id],
      (updateErr) => {
        if (updateErr) {
          console.error(updateErr);
          return res
            .status(500)
            .json({ success: false, message: "Failed to disable user" });
        }

        return res
          .status(204)
          .json({ success: true, message: "User disabled successfully" });
      }
    );
  });
};

const forgotPassword = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  var email = req.body.email;

  dbConnection.query(
    `SELECT * FROM users WHERE email = $1`,
    [email],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({
          message: "Internal Server Error",
        });
      }

      // If the user does not exist in the database
      if (result.rows.length > 0 && result.rows[0].is_disabled == 0) {
        var name = result.rows[0].name;
        let subject = "Forgot Password Request";
        randomToken = randomstring.generate();
        content = `<p>Hi ${name},</p><p>You or someone else has requested a password reset. If you did not request this, please ignore this email. Otherwise, click the link below to reset your password.</p><div><a href="http://localhost:5173/reset-password/${randomToken}">click here</a></div>`;

        sendMail(email, subject, content);

        dbConnection.query(
          `DELETE FROM password_resets where email=$1`,
          [email],
          (deleteErr) => {
            if (deleteErr) {
              console.error(deleteErr);
            }
          }
        );

        dbConnection.query(
          `INSERT INTO password_resets (email, token) VALUES ($1, $2)`,
          [email, randomToken],
          (insertErr) => {
            if (insertErr) {
              console.error(insertErr);
            }
          }
        );

        return res.status(200).json({
          message: "Please check your email to reset password",
        });
      }
      if (result.rows[0].is_disabled == 1) {
        return res.status(404).json({
          message: "User is disabled",
        });
      }
      return res.status(401).json({
        message: "User not found",
      });
    }
  );
};

const resetPasswordLoad = (req, res) => {
  try {
    const token = req.query.token;
    if (token == undefined) {
      return res.redirect("http://localhost:5173/not-found");
    }
    dbConnection.query(
      `SELECT * FROM password_resets WHERE token = $1`,
      [token],
      (err, result, fields) => {
        if (err) {
          console.log(err);
        }
        if (result.rows.length > 0) {
          dbConnection.query(
            "select * from users where email = $1",
            [result.rows[0].email],
            (err, result, firlds) => {
              if (err) {
                console.log(err);
              }
              return res
                .status(200)
                .json({ message: "success", user: result.rows[0] });
            }
          );
        } else {
          return res.redirect("http://localhost:5173/not-found");
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
};

const resetPassword = (req, res) => {
  console.log(req.body);
  if (req.body.password !== req.body.confirmPassword) {
    return res.render("resetPassword", {
      err_message: "Passwords do not match",
    });
  }

  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) {
      console.log(err);
      return res.render("resetPassword", {
        err_message: "Error hashing password",
        user: { id: req.body.id, email: req.body.email },
      });
    }

    dbConnection.query(
      `DELETE FROM password_resets WHERE email='${req.body.email}'`,
      (err) => {
        if (err) {
          console.log(err);
          return res.render("resetPassword", {
            err_message: "Error deleting password reset record",
            user: { id: req.body.id, email: req.body.email },
          });
        }

        console.log(req.body.id);

        dbConnection.query(
          "UPDATE users SET password = $1 WHERE email = $2",
          [hash, req.body.email],
          (err) => {
            if (err) {
              console.log(err);
              return res.render("resetPassword", {
                err_message: "Error updating password",
                user: { id: req.body.id, email: req.body.email },
              });
            }
            console.log("User Password Updated");

            return res.json({ message: "Password reset successfully" });
          }
        );
      }
    );
  });
};

module.exports = {
  register,
  disableUserById,
  verifyMail,
  login,
  logOut,
  getUser,
  disableUser,
  resetPasswordLoad,
  forgotPassword,
  resetPassword,
  getAllUsers,
  getEmailFromResetPassword,
};
