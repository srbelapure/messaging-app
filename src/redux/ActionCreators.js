import * as ActionTypes from "./ActionTypes";
import { baseUrl } from "../shared/baseUrl";

//for loading messages
export const messagesLoading = () => ({
  type: ActionTypes.LOADING_MESSAGES,
});

//when loading/fetching of messages fail
export const messagesLoadingFailed = (errorMessage) => ({
  type: ActionTypes.LOAD_MESSAGES_FAILED,
  payload: errorMessage,
});

//add message to UI
export const addMessage = (messages) => ({
  type: ActionTypes.ADD_MESSAGE,
  payload: messages,
});

//thunk to fetch messages from JSON server
export const fetchMessages = () => (dispatch) => {
    dispatch(messagesLoading(true));
    return fetch(baseUrl + "messages")
      .then(
        (response) => {
          if (response.ok) {
            return response;
          } else {
            var error = new Error(
              "Error " + response.status + ": " + response.statusText
            );
            error.response = response;
            throw error;
          }
        },
        (error) => {
          var errmess = new Error(error.message);
          throw errmess;
        }
      )
      .then((response) => response.json())
      .then((messages) => dispatch(addMessage(messages)))
      .catch((error) => dispatch(messagesLoadingFailed(error.message)));
  };

// export const fetchMessages = () => (dispatch) => {
//   dispatch(messagesLoading(true));
//   return fetch(baseUrl + "users")
//     .then(
//       (response) => {
//         if (response.ok) {
//           return response;
//         } else {
//           var error = new Error(
//             "Error " + response.status + ": " + response.statusText
//           );
//           error.response = response;
//           throw error;
//         }
//       },
//       (error) => {
//         var errmess = new Error(error.message);
//         throw errmess;
//       }
//     )
//     .then((response) => response.json())
//     .then((messages) => dispatch(addMessage(messages)))
//     .catch((error) => dispatch(messagesLoadingFailed(error.message)));
// };

export const getUserDetails = () => (dispatch) => {
  return fetch(baseUrl + "users")
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        var errmess = new Error(error.message);
        throw errmess;
      }
    )
    .then((response) => response.json());
};

export const sendMessageToConversation = (id,name,message)=>(dispatch)=>{
  var messageDetails = {
    id:id,
    uname:name,
    message:message
  };
  return fetch(baseUrl + "messages", {
    method: "POST",
    body: JSON.stringify(messageDetails),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "same-origin",
  })
  .then(
    (response) => {
      if (response.ok) {
        return response;
      } else {
        var error = new Error(
          "Error " + response.status + ": " + response.statusText
        );
        error.response = response;
        throw error;
      }
    },
    (error) => {
      throw error;
    }
  )
  .then((response) => response.json())
  // .then((response) =>
  //   alert(
  //     response.name + " " + "item has been added to the cart!\n"
  //   )
  // )
  .then(() => dispatch(fetchMessages()))
  .catch((error) => {
    alert("Your comment could not be posted\nError: " + error.message);
  });
}

// export const sendMessageToConversation = (id, msgData) => (dispatch) => {
//   var messageDetails = {
//     // messages: [{ message: msgData }]
//     message: msgData
//   };

//   // {"messages":[{"message":"valentine week"}]}
//   return (
//     fetch(baseUrl + "users/" + id, {
//       method: "POST",
//       body: JSON.stringify(messageDetails),
//       headers: {
//         "Content-Type": "application/json",
//       },
//       credentials: "same-origin",
//     })
//       .then(
//         (response) => {
//           if (response.ok) {
//             return response;
//           } else {
//             var error = new Error(
//               "Error " + response.status + ": " + response.statusText
//             );
//             error.response = response;
//             throw error;
//           }
//         },
//         (error) => {
//           throw error;
//         }
//       )
//       .then((response) => response.json())
//       // .then((response) =>
//       //   alert(
//       //     response.name + " " + "item has been added to the cart!\n"
//       //   )
//       // )
//       .then(() => dispatch(fetchMessages()))
//       .catch((error) => {
//         alert("Your comment could not be posted\nError: " + error.message);
//       })
//   );
// };
