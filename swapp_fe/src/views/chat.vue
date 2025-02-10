<template>
    <div>
   
      <TheHeader />

       <div class="chat-container">
         <!-- Sidebar com usuários -->
         <aside class="users-sidebar">
           <h2>Usuários</h2>
           <ul>
             <li
               v-for="user in users"
               :key="user.id"
               @click="selectUser(user)"
               :class="{ active: user.id === activeUser?.id }"
             >
               <img :src="user.avatar" alt="Avatar" class="avatar" />
               <span>{{ user.name }}</span>
             </li>
           </ul>
         </aside>
     
         <!-- Caixa de diálogo -->
         <section class="chat-box">
           <header v-if="activeUser" class="chat-header">
             <img :src="activeUser.avatar" alt="Avatar" class="avatar" />
             <span>{{ activeUser.name }}</span>
           </header>
           <div class="messages" ref="messagesContainer">
             <div
               v-for="(message, index) in messages"
               :key="index"
               :class="{ 'message-bot': message.isBot, 'message-user': !message.isBot }"
             >
               <p>{{ message.text }}</p>
             </div>
           </div>
           <footer class="chat-input">
             <input
               type="text"
               v-model="newMessage"
               placeholder=" Digite uma mensagem"
               @keyup.enter="sendMessage"
             />
             <button @click="sendMessage">Enviar</button>
           </footer>
         </section>
        </div>
       </div>
     </template>
     
   <script>
   import axios from 'axios';
   import TheHeader from "@/components/TheHeaderLogo.vue";
   
   export default {
       name: 'ChatPage',
       components: {
       TheHeader
       },
       data() {
         return {
           users: [], // List of users fetched from the API
           activeUser: null, // Currently selected user
           messages: [], // Chat messages
           newMessage: "", // Input message
         };
       },
       created() {
         // Fetch users when the component is created
         this.fetchUsers();
       },
       methods: {
         async fetchUsers() {
           try {
             const response = await axios.get("http://localhost:8000/api/users");
             const users = response.data;
             // const users = await response.json();
             // Fallback to bot if no users are found
             if (users.length === 0) {
               this.users = [
                 {
                   id: "bot",
                   name: "ChatBot",
                   avatar: require('@/assets/login.png')
                 },
               ];
             } else {
               this.users = users;
             }
           } catch (error) {
             console.error("Error fetching users:", error);
             // Add fallback bot in case of API failure
             this.users = [
                {
                id: "bot",
                name: "ChatBot",
                avatar: require('@/assets/login.png')
                },
             ];
           }
         },
         selectUser(user) {
           this.activeUser = user;
           this.messages = []; // Clear messages when switching users
         },
         sendMessage() {
           if (!this.newMessage.trim()) return;
     
           // Add user message to the chat
           this.messages.push({ text: this.newMessage, isBot: false });
     
           // Simulate bot response
           if (this.activeUser.id === "bot") {
             setTimeout(() => {
               this.messages.push({
                 text: "Hello! How can I assist you?",
                 isBot: true,
               });
             }, 1000);
           }
     
           // Clear input
           this.newMessage = "";
           this.scrollToBottom();
         },
         scrollToBottom() {
           // Scroll the chat to the bottom when a new message is added
           this.$nextTick(() => {
             const container = this.$refs.messagesContainer;
             container.scrollTop = container.scrollHeight;
           });
         },
       },
   };
   </script>
     
   <style scoped>
     .chat-container {
       display: flex;
       height: 100vh;
     }
     
     .users-sidebar {
       width: 20%;
       background: #f4f4f4;
       border-right: 1px solid #ddd;
       padding: 1rem;
     }
     
     .users-sidebar ul {
       list-style: none;
       padding: 0;
     }
     
     .chat-input button {
    padding: 0.5rem 1.5rem;
    border: none;
    background: #76e3c3;
    color: white;
    border-radius: 8px;
    box-shadow: 0px 4px 6px rgba(37, 7, 7, 0.1);
    cursor: pointer;
    font-size: 1rem;
    transition: all 0.2s ease-in-out;
  }

  .chat-input button:hover {
    box-shadow: 0px 6px 8px rgba(0, 0, 0, 0.2);
    transform: translateY(-2px);
  }

  .chat-input button:active {
    background: #76e3c3;
    box-shadow: none;
    transform: translateY(2px);
  }

     .users-sidebar li {
       display: flex;
       align-items: center;
       padding: 0.5rem;
       cursor: pointer;
       border-radius: 5px;
     }
     
     .users-sidebar li.active {
       background: #e0e0e0;
     }
     
     .users-sidebar .avatar {
       width: 40px;
       height: 40px;
       border-radius: 50%;
       margin-right: 0.5rem;
     }
     
     .chat-box {
       flex: 1;
       display: flex;
       flex-direction: column;
     }
     
     .chat-header {
       display: flex;
       align-items: center;
       padding: 1rem;
       border-bottom: 1px solid #ddd;
     }
     
     .chat-header .avatar {
       width: 50px;
       height: 50px;
       border-radius: 50%;
       margin-right: 1rem;
     }
     
     .messages {
       flex: 1;
       overflow-y: auto;
       padding: 1rem;
       background: #fafafa;
     }
     
     .messages .message-bot {
       background: #e0e0e0;
       padding: 0.5rem 1rem;
       margin: 0.5rem 0;
       border-radius: 10px;
       max-width: 60%;
       align-self: flex-start;
     }
     
     .messages .message-user {
       background: #d1ffd6;
       padding: 0.5rem 1rem;
       margin: 0.5rem 0;
       border-radius: 10px;
       max-width: 60%;
       align-self: flex-end;
     }
     
     .chat-input {
       display: flex;
       padding: 1rem;
       border-top: 1px solid #ddd;
     }
     
     .chat-input input {
       flex: 1;
       padding: 0.5rem;
       margin-right: 0.5rem;
       border: 1px solid #ccc;
       border-radius: 5px;
     }
     
   </style>
     