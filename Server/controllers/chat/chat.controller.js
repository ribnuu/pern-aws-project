const generateToken = require("../../config/generateToken");
const bcrypt = require("bcryptjs");
const client = require("../../config/db");

const accessChat = async (req, res) => {
  // const {userId} = req.body;
  const userId = 1;

  if (!userId) {
    console.log("UserId param not sent with the request");
    return res.sendStatus(400);
  }

  //Check chat table and return
  // WHERE group_admin_id = $1 AND is_group_chat = false
  client.query("SELECT * FROM police_chat_master ", (err, results) => {
    if (err) {
      console.log(err);
    } else {
      console.log(results.rows);
      res.send(results.rows);
    }
  });
};

const addMessage = (req, res) => {
  const { message, userId, chatId } = req.body.formData;
  console.log(req.body);
  client.query(
    "INSERT INTO master_police_messages (sender_id , content , chat_id) VALUES ($1 , $2 , $3)",
    [userId, message, chatId],
    (err, results) => {
      if (err) {
        console.log(err);
      } else {
        console.log(results);
      }
    }
  );
};

const getMyChats = (req, res) => {
  const userId = req.params.userId;
  try {
    client.query(
      "SELECT * FROM police_chat_members WHERE police_user_id = $1",
      [userId],
      (err, results) => {
        if (err) {
          console.log(err);
        } else {
          if (results.rowCount > 0) {
            let = police_user_id = results.rows[0].police_user_id;
            console.log(police_user_id);
            client.query(
              "SELECT * FROM police_chat_master WHERE group_admin_id = $1 ",
              [police_user_id],
              (err2, results2) => {
                if (err2) {
                  console.log(err2);
                } else {
                  res.send(results2.rows);
                  console.log(results2.rows);
                }
              }
            );
          }
        }
      }
    );
  } catch (error) {}
};

const getSingleChat = (req, res) => {
  const chatId = req.params.chatId;
  console.log(chatId);
  const userID = 24;
  try {
    client.query(
      "SELECT * FROM police_messages_master INNER JOIN police_user ON police_messages_master.sender_id = police_user.police_officer_id  WHERE chat_id = $1",
      [chatId],
      (err, results) => {
        if (err) {
          console.log(err);
        } else {
          res.send(results.rows);
          console.log(results.rows);
        }
      }
    );
  } catch (error) {}
};

module.exports = {
  accessChat,
  getSingleChat,
  addMessage,
  getMyChats,
};
