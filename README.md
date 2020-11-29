## PROBLEM

Lasr friday with marcel, you guys did the counter, that was basically updating live by using a set interval set to every 5 seconds,
reload the page snd then make the request. And because with HTTP and with what we have seen so far in AJAX, yo have to trigger the request from your computer. There is no other way. For the past 6 weeks we have seen that we have to make a request (trigger it) from our computer to get the responde from the server - and that's what we have seen so far... since the beginning of bootcamp.

Today we are gonna talk about websockets, which is another typw of request which allows for communication in both ways. 

Today we are gonna build a slack clone on the web, it'll be a messaging system where we'll have 2 sides a user messaging another user. The user will receive that message without having to reload.

And we cant do that with ajax because you are the one writing the message and when you press submit and basically adds it to the DOM but on the other users computer it wouldnt actually add it simply because there's been no action. And we dont really wanna keep asking for it to chek if there is a new message every 5 seconds.
We wanna use websockets.

## HTTP
The important part is that the request has to be triggered by the client. And the way you guys worked around that with Marcel last friday was making a request, every 5 seconds, to se if there were any new messages.

## NEXT -> READ IT

## WEB SOCKET
This is why we wanna have web sockets.
WHAT ARE WEBSOCKETS?
WebSockets are a protocol built on top of TCP. They hold the connection to the server open so that the server can send information to the client, even in the absence of a request from the client. WebSockets allow for bi-directional,  communication between the client and the server by creating a persistent connection between the two.
In other words, the browser can make a request and the server can also send back information without being triggered by anything - it says, "oh I have some of the information, here you go" - and if the computer is subscreibing to this specifi channel it will receive it like that. so when i message is sent to the server from a client everyone else who is also connected to that page will also receive it - without the need of an action to trigger that.

Okay? So that's the logic behind action cable.

## START WITH A TEMPLATE

we'll just add a nickname for the purpose of the lecture so we can differentiate the users ok?

## LET'S ADD HAS_MANY ASSOCIATIONS:
Chatroom has_many :messages
- if we wanna do `@user.messages` we need to add has_many here.
we could add the same association to the `User` model but in our app we are never gonna collect ALL the messages of a specific user.
We dont need that, we just need to collect all the messages of a chatroom to display them there. At no point i wanna have every single user messages, so im not gonna add that association.

NOW, if we wanted an inbox style of messaging then maybe I would... because than it would seem to make more sense to get all messages from one user. But then again, it's your app you decide what makes sense!

## CHATROOMS - read slide
`config/routes.rb`
`resources :chatrooms, only: :show `
We are gonna use the show page of the chatroom to communicate;
rails c
> Chatroom.create(name: "general")
> User.create(email: "tatchi@lewagon.org", nickname: "tatchiwiggers", password: "060606")
> User.create(email: "mcpenchel@lewagon.org", nickname: "mcpenchel", password: "060606")

## CONTROLLER & VIEW - copy from slides
so lets take a look at the show page for the chatroom
here we have an id="messages"
here we are adding an id to the dataset so that we can retrieve it later (we'll talk about this in a minute but all we are doing here is putting the id of the chatroom inside this tag, which is hidden and by doing that it means we are going to retrieve it in JS) Remember in JS we cant just do chatroom.find or anything of the sort - so we need to pass it in the HTML so we can do a get element by id and retrieve the dataset.

The <i> tag here means icon. The content inside is typically displayed in italic. The <i> tag is often used to indicate a technical term, a phrase from another language, a thought, a ship name, etc...

<span> tag is used to group and style in-line elements. you can also set many attributes to the <span> tag
<span style="color:red;font-weight:bold"></span>

## Sign in using 2 browsers - read slide
GO TO NAVBAR and interpolate "#{current_user.nickname}"

## CREATE A MESSAGE (1) -  read slides
class MessagesController < ApplicationController
  def create
    @chatroom = Chatroom.find(params[:chatroom_id])
    @messages = Message.new(message_params)
    #ola.chatroom = general (belongs to relationship)
    @message.chatroom = @chatroom
    @message.user = @user
    if @message.save
      redirect_to chatroom_path(@chatroom)
    else
      render 'chatrooms/show'
    end
  end

  private

  def message_params
    params.require(:message).permit(:content)
  end
end

## CREATE A MESSAGE (2) simple form // read slide
<form action="chatrooms/1/messages" method="post"></form> 
so here we also have enable remote: true, so by default we have enabled turbolinks just like you saw with marcel on friday
so that we can render the whole body without reloading the page.
So lets see if it works!!

but we come to that problem where we need to refresh to see the messages.

## ACTION CABLE


