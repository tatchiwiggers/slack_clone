import consumer from "./consumer";

const initChatroomCable = () => {
  // we get the container with the id messages
  const messagesContainer = document.getElementById('messages');
  // here we check that ONLY our chatroom show page loads this function not any other pages
  // because application.js loads on every page, and if this was to load on our home page
  // for example, it would throw an error.
  if (messagesContainer) {
    // dataset.chatroomId -> show page
    // this id will be used to select the channel to which we subscribe
    const id = messagesContainer.dataset.chatroomId;
    // the run the rest of the code - this is the action cable code.
    // it creates the subscription when the user lands on this page.
    // THIS ID HERE IS THE ONE PASSED IN THE PARAMS INSIDE OUR CHATROOM CHANNEL!
    consumer.subscriptions.create({ channel: "ChatroomChannel", id: id }, {
      // triggered when something is broadcast to the channel. it is only called 
      // when new info arrives in the chatroom channel.
      received(data) {
        console.log(data); // called when data is broadcast in the cable
        // here in the callback we insert the new message to the DOM.
        // we find the new message and insert it to the end.
        messagesContainer.insertAdjacentHTML('beforeend', data);
      },
    });
  }
}

export { initChatroomCable };