(
  function () {

    var defaults = {
      showBtnClass: '',
      showBtnHtml: 'Show',
      outerBoxClass: 'sit',
      innerBoxClass: '',
      closeBtnClass: '',
      closeBtnHtml: 'x',
      bodyContentHtml: "input_name.value",
      closeBtnCallback: function () { },
      showBtnCallback: function () { },
      getInputValue: function (inputValue) {
        return inputValue;
      },


    }

    document.addEventListener('DOMContentLoaded', function () {
      var INDEX = 0;
      var geine_chatSubmit = document.getElementById('geine_chat-submit');
      geine_chatSubmit.addEventListener('click', function (e) {
        e.preventDefault();
        var geine_chatInput = document.querySelector('.geine-message-text ');
        var msg = geine_chatInput.innerText;
        // console.log("msg",msg)
        if (msg.trim() === '') {
          return false;
        }
        generateMessage(msg, 'self');
        // document.querySelector('.geine-message-text ').innerText=""
        var buttons = [
          {
            name: 'Existing User',
            value: 'existing'
          },
          {
            name: 'New User',
            value: 'new'
          }
        ];
        setTimeout(function () {
          generateMessage(msg, 'user');
        }, 1000);

      });

      function generateMessage(msg, type) {

        INDEX++;
        var geine_chatLogs = document.querySelector('.geine_chat-logs');
        var geine_chatInput = document.querySelector('.geine-message-text ');
        currentDate = new Date();
        var hours = currentDate.getHours();
        var minutes = currentDate.getMinutes();
        var timeString = formatTime(hours)+ ""+ formatTime(minutes);
        function formatTime(time) {
          return time < 10 ? "0" + time : time;
        }
        function convertRailwayTimeToNormalTime(railwayTime) {
          var hours = parseInt(railwayTime.substr(0, 2));
          var minutes = parseInt(railwayTime.substr(2, 4));
          var normalHours = hours % 12;
          if (normalHours === 0) {
            normalHours = 12;
          }
          var period = (hours < 12) ? "AM" : "PM";
          var normalTime = normalHours.toString().padStart(2, '0') + ":" + minutes.toString().padStart(2, '0') + " " + period;
          return normalTime;
        }
        var railwayTime = timeString;
        var normalTime = convertRailwayTimeToNormalTime(railwayTime);

        var msgAvatar = '<span class="geine-msg-avatar"><img src="./assets/image/genie.png"></span>';
        var tick='<i class="bi bi-check2-all"></i>'
        var cmMsgText = '<div class="geine-cm-msg-text">' + msg + '<div class="geine_chatting-time"><div class="look">' + normalTime +tick+ '</div></div> </div>';
        var str = '<div id="cm-msg-' + INDEX + '" class="geine_chat-msg ' + type + '">' + msgAvatar + cmMsgText + '</div>'
        geine_chatLogs.insertAdjacentHTML('beforeend', str);
        var cmMsg = document.getElementById('cm-msg-' + INDEX);
        cmMsg.style.display = 'none';
        fadeIn(cmMsg, 300);
        if (type === 'self') {
          geine_chatInput.innerText = '';
        }
        animateScroll(geine_chatLogs);
      }

      function fadeIn(element, duration) {
        var opacity = 0;
        var interval = 50;
        var gap = interval / duration;
        element.style.display = 'flex';
        function fade() {
          opacity += gap;
          element.style.opacity = opacity;
          if (opacity >= 1) {
            clearInterval(fading);
          }
        }
        var fading = setInterval(fade, interval);
      }

      function animateScroll(element) {
        var scrollHeight = element.scrollHeight;
        var duration = 1000;
        var interval = 10;
        var gap = (scrollHeight / duration) * interval;
        var scrollPosition = element.scrollTop;
        function scroll() {
          scrollPosition += gap;
          element.scrollTop = scrollPosition;
          if (scrollPosition >= scrollHeight) {
            clearInterval(scrolling);
          }
        }
        var scrolling = setInterval(scroll, interval);
      }
    });

    Element.prototype.GenieChatBox = function (newOptions) {
      if (newOptions) {
        this.options = { ...defaults, ...newOptions };
      } else {
        this.options = defaults;
      }
      // dom named in objLocal................................
      var objLocal = this;
      var styleContent = `<style>
        :root {
            --primary: #1a1a1a;
          }
          
          html,
          body {
            background: #efefef;
            height: 100%;
            font-family: "Poppins";
          }
          *,
          ::after,
          ::before {
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
          }
          #center-text {
            display: flex;
            flex: 1;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            height: 100%;
          }
          [contentEditable=true]:empty:not(:focus):before {
            content: attr(data-text)
          }
          #geine_chat-circle {
            position: fixed;
            bottom: 50px;
            right: 50px;
            background: var(--primary);
            width: 60px;
            height: 60px;
            border-radius: 50%;
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            box-shadow: 0px 3px 16px 0px rgba(0, 0, 0, 0.3),
              0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
          }
          
          #geine_chat-circle i.bi-geine_chat-dots {
            font-size: 1.5rem;
          }
          
          .btn#my-btn {
            background: white;
            padding-top: 13px;
            padding-bottom: 12px;
            border-radius: 45px;
            padding-right: 40px;
            padding-left: 40px;
            color: var(--primary);
          }
          #geine_chat-overlay {
            background: rgba(255, 255, 255, 0.1);
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border-radius: 50%;
            display: none;
          }
          
          .geine_chat-box {
            display: none;
            background: #efefef;
            position: fixed;
            right: 30px;
            bottom: 50px;
            width: 350px;
            border-radius: 5px;
            box-shadow: 0px 5px 35px 9px #ccc;
          }
        
          .geine_chat-box-header {
            background: var(--primary);
            height: 50px;
            border-top-left-radius: 5px;
            border-top-right-radius: 5px;
            color: white;
            text-align: center;
            font-size: 1rem;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .geine_chat-box-body {
            position: relative;
            height: 370px;
            height: auto;
            border: 1px solid #ccc;
            overflow: hidden;
          }
          .geine_chat-box-body:after {
            content: "";
            background: rgb(246, 246, 247);
            opacity: 0.1;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            height: 100%;
            position: absolute;
            z-index: -1;
          }
          
          .geine-chat-input > form {
            margin-bottom: 0;
          }
          #geine-chat-input::-webkit-input-placeholder {
           
            color: #ccc;
          }
          #geine-chat-input::-moz-placeholder {
          
            color: #ccc;
          }
          #geine-chat-input:-ms-input-placeholder {
     
            color: #ccc;
          }
          #geine-chat-input:-moz-placeholder {
          
            color: #ccc;
          }
          .geine_chat-submit {
            position: absolute;
            bottom: 8px;
            right: 11px;
            background: transparent;
            box-shadow: none;
            border: none;
            border-radius: 50%;
            color: var(--primary);
           
            cursor: pointer;
            font-size: 1.3rem;
            transform: rotate(45deg);
           
          }
          .geine_chat-logs {
            padding: 15px;
            height: 370px;
            overflow-y: auto;
          
          }
          
          @media only screen and (max-width: 500px) {
            .geine_chat-logs {
              height: 40vh;
            }
          }
          
          .geine_chat-msg.user > .geine-msg-avatar img {
            width: 100%;
            height: 100%;
            border-radius: 10em;
            background-size: cover;
          }
          .geine_chat-msg.self > .geine-msg-avatar img {
            width: 100%;
            height: 100%;
            border-radius: 10em;
            background-size: cover;
          }
          .geine-cm-msg-text {
            background: white;
            padding: 10px 10px 18px;
            color: #666;
            max-width: 75%;
           
            font-size: 0.8rem;
            word-break: break-word;
           
            position: relative;
            border-top-left-radius: 6px;
            border-bottom-left-radius: 6px;
            border-top-right-radius: 6px;
            border-bottom-right-radius: 6px;
            text-align: left;
            min-width: 25%;
            box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 2px;
          }
          .geine-msg-avatar {
            width: 36px;
            height: 36px;
            overflow: hidden;
            z-index: 1;
          }
          .geine_chat-msg.self > .geine-cm-msg-text {
         
            background: var(--primary);
            color: white;
            direction: initial;
          }
          .cm-msg-button > ul > li {
            list-style: none;
            float: left;
            width: 50%;
          }
          .cm-msg-button {
            clear: both;
            margin-bottom: 70px;
          }
          .geine_chat-msg.self {
            display: flex;
            align-items: end;
            justify-content: flex-start;
            direction: rtl;
            margin-bottom: 1rem;
            gap: 6px;
          
           
          }
          .geine_chat-msg.user {
            display: flex;
            align-items: end;
            gap: 6px;
            margin-bottom: 1rem;
          }
         
                
          .geine_chatting-time {
            opacity: 0.8;
            text-align: right;
            font-size: 0.6rem;
            direction: initial;
            position: absolute;
            right: 10px;
            bottom: 1px;
          }
          .geine_chatting-time i {
            font-size: 1rem;
            line-height: 0;
          }
          .geine_chatting-time .look {
            display: flex;
            align-items: center;
            gap: 6px;
          }
          .geine_chat-question {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            justify-content: center;
            padding: 10px 0;
          }
          .geine_chat-question button {
            color: var(--primary);
            background: white;
            border: 1px solid var(--primary);
            border-radius: 4px;
            padding: 6px 10px;
            cursor: pointer;
          }
          
          .geine_chat-question button:hover {
            color: white;
            background: var(--primary);
            transition: 0.6s ease;
          }
          
          .geine_chat-dt-divider {
            height: 20px;
            margin: 16px -0.5em;
            text-align: center;
            overflow: hidden;
          }
          .geine_chat-dt-divider .dt {
            font-size: 12px;
            position: relative;
            padding: 0px 8px;
            color: rgb(112, 112, 112);
            border-color: rgba(0, 0, 0, 0.1);
          }
          .geine_chat-dt-divider .dt::before,
          .geine_chat-dt-divider .dt::after {
            content: "";
            width: 50vw;
            height: 0px;
            border-top-width: 1px;
            border-top-style: solid;
            border-top-color: inherit;
            position: absolute;
            top: 50%;
          }
          .geine_chat-dt-divider .dt::before {
            right: 100%;
          }
          .geine_chat-dt-divider .dt::after {
            left: 100%;
          }
          .bot-image {
            height: 30px;
            width: 30px;
     
            position: relative;
            padding: 2px;
          }
          .bot-image::before {
            content: "";
            width: 8px;
            height: 8px;
            background: #00d000;
            position: absolute;
            top: 0;
            right: -3px;
            border-radius: 10em;
          }
          .bot-image img {
            width: 100%;
            height: 100%;
          }
          .bot-head-label {
            display: flex;
            align-items: center;
            gap: 12px;
          }
          .geine_chat-box-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 10px;
          }
          .geine_header-icons {
            display: flex;
            align-items: center;
            gap: 10px;
          }
          .geine_header-icons span {
            font-size: 1.5rem;
            cursor: pointer;
          }
          .geine_header-icons span.geine_chat-box-toggle i {
            font-size: 1.2rem;
          }
          .geine-chat-input {
            position: relative;
          }
          .input-geine-left-icons {
            position: absolute;
            bottom: 0;
            left: 0;
            z-index: 1;
            padding-left: 6px;
            display: flex;
            align-items: center;
            gap: 6px;
          }
          .geine-upload-area {
            font-size: 1.3rem;
            border: 0;
            cursor: pointer;
            background: transparent;
           
          }
          .input-geine-left-icons button {
            font-size: 1.3rem;
            border: 0;
            cursor: pointer;
            background: transparent;
            padding: 8px 3px;
          }
          .geine-upload-area {
            cursor: pointer;
          }
          .geine-upload-area input {
            display: none;
          }
          .geine_chat-head-title {
            text-align: left;
            display: flex;
            flex-direction: column;
            line-height: 1.2;
          }
          .geine_chat-head-title small {
            font-size: 0.7rem;
            opacity: 0.6;
          }
          .geine-message-text {
            min-height: 1em; 
            max-height: 97px;
            width: 100%;
            align-content: center;
            outline: none;
            overflow: hidden;
            font-size:.8rem;
            cursor: text;
           
          }
          
          .geine-message-wrapper {
           
            background-color: #f9fafb;
            padding: 10px; 
            max-height: 145px; 
            padding: 10px 50px 10px 76px;
          }
          
          .editable:empty:before {
            content: attr(data-placeholder);
            color:gray;
          }
          
        
          .dot-falling {
            position: relative;
            left: -9972px;
            width: 6px;
            height: 6px;
            border-radius: 5px;
            background-color: var(--primary);
            color: var(--primary);
            box-shadow: 9999px 0 0 0 var(--primary);
            animation: dot-falling 1s infinite linear;
            animation-delay: 0.1s;
            top: 4px;
          }
          .dot-falling::before,
          .dot-falling::after {
            content: "";
            display: inline-block;
            position: absolute;
            top: 0;
          }
          .dot-falling::before {
            width: 6px;
            height: 6px;
            border-radius: 5px;
            background-color: var(--primary);
            color: var(--primary);
            animation: dot-falling-before 1s infinite linear;
            animation-delay: 0s;
            margin-left: 3px;
          }
          .dot-falling::after {
            width: 6px;
            height: 6px;
            border-radius: 5px;
            background-color: var(--primary);
            color: var(--primary);
            animation: dot-falling-after 1s infinite linear;
            animation-delay: 0.2s;
            margin-left: -3px;
          }
          
div.geine-emoji-drop-down {
    height: 172px;
    width: 100%;
    max-width: 212px;
    overflow-x: hidden;
    overflow-y: scroll;
    position: absolute;
    background-color: #F5F5F5;
    border-radius: 0.25rem;
    white-space: normal;
    text-align: center;
    border: 1px solid #282828;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    -o-user-select: none;
    user-select: none;
    color: #282828;
    display: none;
    padding: 5px;
  }
  
  div.geine-emoji-drop-down div.geine-emoji {
 
    height: 35px;
    width: 35px;
    margin-bottom: 5px;
    margin-right: 5px;
    display: inline-block;
    font-size: 20pt;
    border-radius: 0.25rem;
  }
  
  div.geine-emoji-drop-down div.geine-emoji:hover {
    cursor: pointer;
    -webkit-transition: all .3s;
    transition: all .3s;
    background-color: #282828;
    color: #F5F5F5;
  }
  
  div.geine-emoji-drop-down div.geine-emoji:active {
    cursor: pointer;
    -webkit-transition: all .3s;
    transition: all .3s;
    opacity: 0.7;
  }
  
  div.geine-emoji-drop-down div.geine-emoji:last-child {
    margin-bottom: 0;
  }
  
 
  .custom-scroll-bars::-webkit-scrollbar {
    width: 12px;
  }
  
  .custom-scroll-bars::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px gray;
    box-shadow: inset 0 0 6px gray;
  }
  
  .custom-scroll-bars::-webkit-scrollbar-thumb {
    -webkit-box-shadow: inset 0 0 6px gray;
    box-shadow: inset 0 0 6px gray;
    background: #F5F5F5;
  }
          
          @keyframes dot-falling {
            0% {
              box-shadow: 9999px -15px 0 0 rgba(152, 128, 255, 0);
            }
            25%,
            50%,
            75% {
              box-shadow: 9999px 0 0 0 var(--primary);
            }
            100% {
              box-shadow: 9999px 15px 0 0 rgba(152, 128, 255, 0);
            }
          }
          @keyframes dot-falling-before {
            0% {
              box-shadow: 9984px -15px 0 0 rgba(152, 128, 255, 0);
            }
            25%,
            50%,
            75% {
              box-shadow: 9984px 0 0 0 var(--primary);
            }
            100% {
              box-shadow: 9984px 15px 0 0 rgba(152, 128, 255, 0);
            }
          }
          @keyframes dot-falling-after {
            0% {
              box-shadow: 10014px -15px 0 0 rgba(152, 128, 255, 0);
            }
            25%,
            50%,
            75% {
              box-shadow: 10014px 0 0 0 var(--primary);
            }
            100% {
              box-shadow: 10014px 15px 0 0 rgba(152, 128, 255, 0);
            }
          }
    </style>`;
      //.............body.......
      const body = document.createElement("div");
      body.setAttribute("id", "body");
      function chatboxcontainer() {

        // .....................btn raised..............
        const btn_btn_raised = document.createElement("div");
        btn_btn_raised.setAttribute("class", "btn geine_btn-raised");
        btn_btn_raised.setAttribute("id", "geine_chat-circle");
        btn_btn_raised.className = "btn geine_btn-raised";
        const geine_chat_overlay = document.createElement("div");
        geine_chat_overlay.setAttribute("id", "geine_chat-overlay");
        geine_chat_overlay.className = "geine_chat-overlay";
        const i = document.createElement("i");
        i.setAttribute("class", "bi bi-chat-dots")
        btn_btn_raised.appendChild(geine_chat_overlay);
        btn_btn_raised.appendChild(i);
        body.appendChild(btn_btn_raised);

        // .........geine_chat box.........
        const geine_chat_box = document.createElement("div");
        geine_chat_box.setAttribute("class", "geine_chat-box");
        geine_chat_box.className = "geine_chat-box";
        // ................geine_chatbox header........
        const geine_chat_box_header = document.createElement("div");
        geine_chat_box_header.setAttribute("class", "geine_chat-box-headery");
        geine_chat_box_header.className = "geine_chat-box-header";
        const bot_head_label = document.createElement("div");
        bot_head_label.setAttribute("class", "bot-head-label");
        bot_head_label.className = "bot-head-label";
        const bot_image = document.createElement("div");
        bot_image.setAttribute("class", "bot-image");
        bot_image.className = "bot-image";
        const imagesrc = document.createElement("img");
        imagesrc.setAttribute('src', "./assets/image/genie.png");
        const active_dot = document.createElement("div");
        active_dot.setAttribute("class", "active");
        bot_image.appendChild(imagesrc);
        bot_image.appendChild(active_dot);
        const geine_chat_head_title = document.createElement("div");
        geine_chat_head_title.setAttribute("class", "geine_chat-head-title");
        geine_chat_head_title.className = "geine_chat-head-title";
        const geine_chat_head_titles = document.createElement("div");
        geine_chat_head_titles.innerText = "GenieBot";
        const small = document.createElement("small");
        small.innerText = "Online";
        geine_chat_head_title.appendChild(geine_chat_head_titles);
        geine_chat_head_title.appendChild(small);
        bot_head_label.appendChild(bot_image);
        bot_head_label.appendChild(geine_chat_head_title);


        const header_icons = document.createElement("div");
        header_icons.setAttribute("class", "geine_header-icons");
        header_icons.className = "geine_header-icons";
        const soundStatus = document.createElement("span");
        soundStatus.setAttribute("class", "geine-soundControl");
        soundStatus.className = "geine-soundControl";

        const fill_soundStatuss = document.createElement("i");
        fill_soundStatuss.setAttribute("class", "bi bi-volume-up-fill soundStatus");
        fill_soundStatuss.className = "bi bi-volume-up-fill soundStatus";
        soundStatus.appendChild(fill_soundStatuss);

        const geine_chat_box_toggle = document.createElement("span");
        geine_chat_box_toggle.setAttribute("class", "geine_chat-box-toggle");
        geine_chat_box_toggle.className = "geine_chat-box-toggle";

        const bi_x_lg = document.createElement("i");
        bi_x_lg.setAttribute("class", "bi bi-x-lg");
        bi_x_lg.className = "bi bi-x-lg";
        geine_chat_box_toggle.appendChild(bi_x_lg);
        header_icons.appendChild(soundStatus);
        header_icons.appendChild(geine_chat_box_toggle);
        geine_chat_box_header.appendChild(bot_head_label);
        geine_chat_box_header.appendChild(header_icons);
        geine_chat_box.appendChild(geine_chat_box_header);
        // ..........................geine_chat.box body..........................
        const geine_chat_box_body = document.createElement("div");
        geine_chat_box_body.setAttribute("class", "geine_chat-box-body");
        geine_chat_box_body.className = "geine_chat-box-body";
        // .....................box overlay.........................
        const geine_chat_box_overlay = document.createElement("div");
        geine_chat_box_overlay.setAttribute("class", "geine_chat-box-overlay");
        geine_chat_box_overlay.className = "geine_chat-box-overlay";
        geine_chat_box_body.appendChild(geine_chat_box_overlay);
        // .............geine_chat logs.....................
        const geine_chat_logs = document.createElement("div");
        geine_chat_logs.setAttribute("class", "geine_chat-logs");
        geine_chat_logs.className = "geine_chat-logs";
        // ................geine_chat dt-divider...................

        var currentDate = new Date();
        var date = currentDate.getDate();
        var month = currentDate.getMonth() + 1; // Adding 1 to get the actual month
        var monthString = currentDate.toLocaleString('default', { month: 'long' });

        var year = currentDate.getFullYear();
        // Format the date as "DD-MM-YYYY"
        var formattedDate = ("0" + date).slice(-2) + "-" + (monthString) + "-" + year;
        // console.log("Formatted Date: " + formattedDate);

        const geine_chat_dt_divider = document.createElement("div");
        geine_chat_dt_divider.setAttribute("class", "geine_chat-dt-divider");
        geine_chat_dt_divider.className = "geine_chat-dt-divider";
        const dt = document.createElement("span");
        dt.setAttribute("class", "dt");
        dt.className = "dt";
        dt.innerText = formattedDate;
        geine_chat_dt_divider.appendChild(dt);
        geine_chat_logs.appendChild(geine_chat_dt_divider);
        // .................geine_chat msg self...........
        const geine_chat_msg_self = document.createElement("div");
        geine_chat_msg_self.setAttribute("class", "geine_chat-msg self");
        geine_chat_msg_self.className = "geine_chat-msg self";

        // const cm_msg_text=document.createElement("div");
        // cm_msg_text.setAttribute("class","geine-cm-msg-text");
        // cm_msg_text.className="geine-cm-msg-text";
        // cm_msg_text.innerText="Lorem ipsum dolor sit amet, consectetur adipiscing elit";


        // const geine_chatting_time=document.createElement("div");
        // geine_chatting_time.setAttribute("class","geine_chatting-time");
        // geine_chatting_time.className="geine_chatting-time";
        // const look=document.createElement("div");
        // look.setAttribute("class","look");
        // look.className="look";
        // look.innerText="06:30 PM";
        // const bi_check2_all =document.createElement("i");
        // bi_check2_all.setAttribute("class","bi bi-check2-all");
        // bi_check2_all.className="bi bi-check2-all"; 
        // look.appendChild(bi_check2_all);
        // geine_chatting_time.appendChild(look);
        // cm_msg_text.appendChild(geine_chatting_time);
        // geine_chat_msg_self.appendChild(cm_msg_text);
        // geine_chat_logs.appendChild(geine_chat_msg_self);
        // // .............geine_chat msg user..............

        // const geine_chat_msg_user=document.createElement("div");
        // geine_chat_msg_user.setAttribute("id","cm-msg-2");
        // geine_chat_msg_user.setAttribute("class","geine_chat-msg user");
        // geine_chat_msg_user.className="geine_chat-msg user";


        // const msg_avatar=document.createElement("div");
        // msg_avatar.setAttribute("class","geine-msg-avatar");
        // msg_avatar.className="geine-msg-avatar";

        // const imagesrcc=document.createElement("img");
        // imagesrcc.setAttribute('src', "./assets/image/genie.png");
        // msg_avatar.appendChild(imagesrcc);
        // geine_chat_msg_user.appendChild(msg_avatar);

        // const cm_msg_text1=document.createElement("div");
        // cm_msg_text1.setAttribute("class","geine-cm-msg-text");
        // cm_msg_text1.className="geine-cm-msg-text";
        // cm_msg_text1.innerText="Lorem ipsum dolor sit amet";

        // const geine_chatting_time1=document.createElement("div");
        // geine_chatting_time1.setAttribute("class","geine_chatting-time");
        // geine_chatting_time1.className="geine_chatting-time";
        // geine_chatting_time1.innerText="06:30 PM";

        // cm_msg_text1.appendChild(geine_chatting_time1);
        // geine_chat_msg_user.appendChild(cm_msg_text1);
        // geine_chat_logs.appendChild(geine_chat_msg_user);
        // // .....geine_chat msg user...........

        // const geine_chat_msg_user1=document.createElement("div");
        // geine_chat_msg_user1.setAttribute("id","cm-msg-2");
        // geine_chat_msg_user1.setAttribute("class","geine_chat-msg user");
        // geine_chat_msg_user1.className="geine_chat-msg user";


        // const msg_avatar1=document.createElement("div");
        // msg_avatar1.setAttribute("class","geine-msg-avatar");
        // msg_avatar1.className="geine-msg-avatar";

        // const imagesrcc1=document.createElement("img");
        // imagesrcc1.setAttribute('src', "./assets/image/genie.png");
        // msg_avatar1.appendChild(imagesrcc1);
        // geine_chat_msg_user1.appendChild(msg_avatar1);


        // const cm_msg_text2=document.createElement("div");
        // cm_msg_text2.setAttribute("class","geine-cm-msg-text");
        // cm_msg_text2.className="geine-cm-msg-text";

        // const geine_snippet=document.createElement("div");
        // geine_snippet.setAttribute("class","geine_snippet");
        // geine_snippet.className="geine_snippet";
        // geine_snippet.setAttribute("data-title","dot-falling");
        // const stage=document.createElement("div");
        // stage.setAttribute("class","stage");
        // stage.className="stage";

        // const dot_falling=document.createElement("div");
        // dot_falling.setAttribute("class","dot-falling");
        // dot_falling.className="dot-falling";

        // stage.appendChild(dot_falling);
        // geine_snippet.appendChild(stage);
        // cm_msg_text2.appendChild(geine_snippet);
        // geine_chat_msg_user1.appendChild(cm_msg_text2);

        // geine_chat_logs.appendChild(cm_msg_text2);


        // ................geine_chat question.........................................
        const geine_chat_question = document.createElement("div");
        geine_chat_question.setAttribute("class", "geine_chat-question");
        geine_chat_question.className = "geine_chat-question";
        const button1 = document.createElement("button");
        button1.textContent = "Sales question";
        const button2 = document.createElement("button");
        button2.textContent = "Support question";
        const button3 = document.createElement("button");
        button3.textContent = "Product based Inquiry";
        geine_chat_question.appendChild(button1);
        geine_chat_question.appendChild(button2);
        geine_chat_question.appendChild(button3);
        geine_chat_logs.appendChild(geine_chat_question);
        geine_chat_box_body.appendChild(geine_chat_logs);
        geine_chat_box.appendChild(geine_chat_box_body);
        // .................geine_chat input...................
        const geine_chat_input = document.createElement("div");
        geine_chat_input.setAttribute("class", "geine-chat-input");
        geine_chat_input.className = "geine-chat-input";
        //...........form.........................
        const form = document.createElement("form");
        const input_left_icons = document.createElement("div");
        input_left_icons.setAttribute("class", "input-geine-left-icons");
        input_left_icons.className = "input-geine-left-icons";

        const label = document.createElement("label");
        label.setAttribute("class", "geine-upload-area");
        label.className = "geine-upload-areas";
        const file = document.createElement("input");
        file.setAttribute("type", "file");
        file.setAttribute("class", " geniechatfile");
        const label_i = document.createElement("i");
        label_i.setAttribute("class", "bi bi-paperclip");
        label_i.className = "bi bi-paperclip";
        label.setAttribute("class", "geine-upload-area");
        label.appendChild(file);
        label.appendChild(label_i);
        input_left_icons.appendChild(label);

        const geine_middle = document.createElement("div");
        geine_middle.setAttribute("class", "geine_middle");
        geine_middle.className = "geine_middle";
        const buttontag = document.createElement("button");
        buttontag.setAttribute("class", "geine-emoji");
        buttontag.className = "geine-emoji";
        buttontag.setAttribute("id", "button3");
        buttontag.setAttribute("type", "button");
        const buttontag_i = document.createElement("i");
        buttontag_i.setAttribute("class", "bi bi-emoji-smile");
        buttontag_i.className = "bi bi-emoji-smile";
        geine_middle.appendChild(buttontag);
        geine_middle.appendChild(buttontag_i);
        input_left_icons.appendChild(geine_middle);
        form.appendChild(input_left_icons);
        // ...........message_wrapper.............
        const message_wrapper = document.createElement("div");
        message_wrapper.setAttribute("class", "geine-message-wrapper")
        message_wrapper.className = "geine-message-wrapper";

        const message_text = document.createElement("div");
        message_text.setAttribute("class", "geine-message-text editable");
        message_text.setAttribute("id", "geine-chat-input");
        message_text.setAttribute("type", "text");
        message_text.setAttribute("contenteditable", "true");
        message_text.setAttribute("data-text", "Write a message...");
        // message_text.setAttribute(" contentEditable data-placeholder","Write a message...");
        message_text.className = "geine-message-text editable";
        message_wrapper.appendChild(message_text);
        form.appendChild(message_wrapper);
        // ...................butto submit.....................
        const submit = document.createElement("button");
        submit.setAttribute("class", "geine_chat-submit");
        submit.setAttribute("id", "geine_chat-submit");
        submit.setAttribute("type", "submit");
        const submit_i = document.createElement("i");
        submit_i.setAttribute("class", "bi bi-send-fill");
        submit_i.className = "bi bi-send-fill";
        submit.appendChild(submit_i);
        form.appendChild(submit);
        geine_chat_input.appendChild(form);
        geine_chat_box.appendChild(geine_chat_input);
        body.appendChild(geine_chat_box);
      }
      chatboxcontainer();
      // ...................................
      objLocal.appendChild(body);
      objLocal.innerHTML += styleContent;
      // ...........................................................................
      // objLocal.innerHTML = htmlContent;
      document.getElementById("geine_chat-circle").addEventListener("click", function () {
        var x = document.querySelector(".geine_chat-box");
        var geine_chatcircle = document.querySelector(".geine_chat-circle");
        x.style.display = "block";
  

      });

document.querySelector(".geine-upload-area").addEventListener("change",function (event){
  var fileInput = document.querySelector(".geniechatfile")


var file = fileInput.files[0];
// console.log("fileInput.files", file)
if (file) {
  var allowedExtensions = [".DOCX", ".docx", ".txt", ".TXT", ".PDF", ".pdf", ".jpeg", ".JPEG", ".png",".PNG"];
  var fileExtension = file.name.substring(file.name.lastIndexOf(".")).toLowerCase();
  
  if (allowedExtensions.includes(fileExtension)) {
    var formData = new FormData();
    formData.append("file", file);
    var geine_chatInput = document.querySelector('.geine-message-text ');
   geine_chatInput.innerText=fileExtension;

    // var xhr = new XMLHttpRequest();
    // xhr.open("POST", "/upload", true);
    
    // xhr.onreadystatechange = function() {
    //   if (xhr.readyState === 4 && xhr.status === 200) {
    //     // File uploaded successfully
    //     console.log("File uploaded!");
    //   }
    // };
    
    // xhr.send(formData);
  } else {
    
    console.log("Invalid file extension!");
  }
}







 

//   var allowedExtensions = [".DOCX", ".docx", ".txt", ".TXT", ".PDF", ".pdf"];
// console.log(file)
//   for (var i = 0; i < files.length; i++) {
//     var file = files[i];
//     var fileName = file.name;
//     var fileExtension = fileName.substring(fileName.lastIndexOf("."));

//     if (allowedExtensions.includes(fileExtension)) {
//       // File is valid, you can perform further actions here
//       console.log("Valid file:", fileName);
//     } else {
//       // Invalid file extension, you can display an error message or take appropriate action
//       console.log("Invalid file:", fileName);
//     }
//   }



})
      document.querySelector(".bi-x-lg").addEventListener("click", function () {
        var x = document.querySelector(".geine_chat-box");
        x.style.display = "none";
        // x.classList.toggle("scale");
        var geine_chatcircle = document.querySelector(".geine_chat-circle");
        // geine_chatcircle.classList.toggle("scale")
      });
      document.addEventListener("click", function (event) {
        if (event.target.classList.contains("geine_chat-btn")) {
          var value = event.target.getAttribute("geine_chat-value");
          var name = event.target.innerHTML;
          document.getElementById("geine-chat-input").disabled = false;
          generate_message(name, 'self');
        }
      });

      document.addEventListener("DOMContentLoaded", function () {
        var geine_soundControl = document.querySelectorAll(".geine-soundControl");
        for (var i = 0; i < geine_soundControl.length; i++) {
          geine_soundControl[i].addEventListener("click", function () {
            var soundStatus = document.querySelectorAll(".soundStatus");
            for (var j = 0; j < soundStatus.length; j++) {
              soundStatus[j].classList.toggle("bi-volume-mute-fill");
              soundStatus[j].classList.toggle("bi-volume-up-fill");
            }
          });
        }
      });




    }

  })();


