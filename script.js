const bank = [

{
q:"What does HTML stand for in web development?",
o:[
"Hyper Text Markup Language",
"High Transfer Machine Language",
"Hyperlink Text Management Language",
"Home Tool Markup Language"
],
a:0
},

{
q:"Which technology is primarily used for styling web pages and creating responsive layouts?",
o:[
"HTML",
"Python",
"CSS",
"MongoDB"
],
a:2
},

{
q:"What is the primary purpose of JavaScript in web development?",
o:[
"To structure web pages",
"To add interactivity and dynamic behavior",
"To manage databases",
"To design logos"
],
a:1
},

{
q:"Which HTML tag is used to create a hyperlink that redirects users to another webpage?",
o:[
"<a>",
"<p>",
"<link>",
"<button>"
],
a:0
},

{
q:"Which JavaScript keyword is used to declare a variable that cannot be reassigned?",
o:[
"let",
"var",
"const",
"static"
],
a:2
},

{
q:"Which CSS property is commonly used to change the background color of an element?",
o:[
"font-color",
"background-color",
"text-style",
"border-color"
],
a:1
},

{
q:"What is the purpose of the Document Object Model (DOM) in JavaScript?",
o:[
"To connect websites with databases",
"To create animations only",
"To allow JavaScript to dynamically access and modify HTML elements",
"To host web applications online"
],
a:2
},

{
q:"Which JavaScript function is commonly used to print messages in the browser console for debugging purposes?",
o:[
"console.log()",
"print()",
"write()",
"debug.console()"
],
a:0
},

{
q:"Which CSS property is used to make a website responsive on different screen sizes?",
o:[
"display",
"media queries",
"font-style",
"border-radius"
],
a:1
},

{
q:"What is the main purpose of GitHub in software and web development projects?",
o:[
"Creating databases",
"Hosting and managing source code repositories",
"Designing UI layouts",
"Running JavaScript code"
],
a:1
},

{
q:"Which HTML element is used to display the largest heading on a webpage?",
o:[
"<heading>",
"<head>",
"<h1>",
"<title>"
],
a:2
},

{
q:"What is the purpose of the 'onclick' event in JavaScript?",
o:[
"To apply CSS styles",
"To trigger an action when a user clicks an element",
"To refresh the webpage",
"To connect APIs"
],
a:1
},

{
q:"Which CSS property is used to add space inside an element between its content and border?",
o:[
"margin",
"spacing",
"padding",
"border-spacing"
],
a:2
},

{
q:"Why are media queries important in responsive web design?",
o:[
"They improve database performance",
"They allow websites to adapt to different screen sizes",
"They increase internet speed",
"They replace JavaScript functionality"
],
a:1
},

{
q:"What is the primary benefit of using responsive web design techniques?",
o:[
"Websites load without internet",
"Websites automatically adapt to desktop, tablet, and mobile devices",
"Websites require less HTML",
"Websites do not need CSS"
],
a:1
}

];

let qset = [];
let i = 0;
let score = 0;
let time = 15;
let timer;
let answered = false;

let reviewAnswers = [];

const motivationalMessages = [
"🚀 Keep Going!",
"🔥 You're Doing Great!",
"💡 Think Carefully!",
"🎯 Stay Focused!",
"🏆 Aim For Full Score!",
"⚡ Fast And Smart!",
"🌟 You Can Do It!"
];

function show(id){

document.querySelectorAll(".screen")
.forEach(screen=>{
screen.classList.remove("active");
});

document.getElementById(id)
.classList.add("active");

}

function goToInstructions(){

show("instructions");

}

function startQuiz(){

qset = [...bank]
.sort(()=>Math.random()-0.5)
.slice(0,10);

i = 0;
score = 0;
answered = false;

reviewAnswers = [];

show("quiz");

load();

}

function load(){

clearInterval(timer);

time = 15;

answered = false;

let q = qset[i];

qno.textContent = `Q${i+1}/10`;

question.textContent = q.q;

scoreEl.textContent = score;

next.disabled = true;

timeEl.style.color = "white";

options.innerHTML = "";

bar.style.width = ((i/qset.length)*100)+"%";

const letters = ["A","B","C","D"];

q.o.forEach((opt,idx)=>{

let btn = document.createElement("button");

let wrapper = document.createElement("div");

wrapper.className = "opt";

let circle = document.createElement("div");

circle.className = "circle";

circle.textContent = letters[idx];

let text = document.createElement("div");

text.className = "option-text";

text.textContent = opt;

wrapper.appendChild(circle);

wrapper.appendChild(text);

btn.appendChild(wrapper);

btn.onclick = ()=>select(btn,idx);

options.appendChild(btn);

});

addMotivation();

startTimer();

}

function addMotivation(){

const oldMsg = document.getElementById("motivation");

if(oldMsg){
oldMsg.remove();
}

let msg = document.createElement("p");

msg.id = "motivation";

msg.style.marginTop = "10px";

msg.style.fontSize = "15px";

msg.style.color = "#a5b4fc";

msg.textContent =
motivationalMessages[
Math.floor(Math.random()*motivationalMessages.length)
];

question.after(msg);

}

function select(btn,idx){

if(answered) return;

answered = true;

clearInterval(timer);

let correct = qset[i].a;

document.querySelectorAll("#options button")
.forEach((b,index)=>{

b.disabled = true;

if(index === correct){
b.classList.add("correct");
}

});

if(idx !== correct){

btn.classList.add("wrong");

reviewAnswers.push({
question:qset[i].q,
selected:qset[i].o[idx],
correct:qset[i].o[correct]
});

}else{

score++;

localStorage.setItem(
"bestScore",
Math.max(
score,
localStorage.getItem("bestScore") || 0
)
);

}

scoreEl.textContent = score;

next.disabled = false;

}

function nextQ(){

i++;

if(i < qset.length){

load();

}else{

result();

}

}

function startTimer(){

timer = setInterval(()=>{

time--;

timeEl.textContent = time;

let offset = 113 * (1 - time/15);

arc.style.strokeDashoffset = offset;

if(time <= 5){

timeEl.style.color = "red";

}

if(time <= 0){

clearInterval(timer);

autoSelect();

}

},1000);

}

function autoSelect(){

answered = true;

let correct = qset[i].a;

document.querySelectorAll("#options button")
.forEach((b,index)=>{

b.disabled = true;

if(index === correct){

b.classList.add("correct");

}

});

next.disabled = false;

}

function result(){

show("result");

final.textContent = `You scored ${score}/10`;

let msg = "📚 Keep Practicing!";

if(score >= 8){

msg = "🏆 Excellent Work!";

}else if(score >= 5){

msg = "🔥 Good Job!";

}

title.textContent = msg;

document.getElementById("score-big")
.textContent = score;

const circle =
document.getElementById("progress-circle");

const circumference =
2 * Math.PI * 50;

circle.style.strokeDasharray =
circumference;

setTimeout(()=>{

const offset =
circumference * (1 - score/10);

circle.style.strokeDashoffset =
offset;

},200);

createReviewSection();

}

function createReviewSection(){

let old = document.getElementById("review");

if(old){
old.remove();
}

let review = document.createElement("div");

review.id = "review";

review.style.marginTop = "20px";

if(reviewAnswers.length === 0){

review.innerHTML =
"<p style='color:#22c55e;'>Perfect Score! No wrong answers.</p>";

}else{

reviewAnswers.forEach(item=>{

let div = document.createElement("div");

div.style.marginBottom = "14px";

div.style.textAlign = "left";

div.innerHTML = `
<p><b>Question:</b> ${item.question}</p>
<p style="color:#ef4444;">
Your Answer: ${item.selected}
</p>
<p style="color:#22c55e;">
Correct Answer: ${item.correct}
</p>
`;

review.appendChild(div);

});

}

result.appendChild(review);

}

function restart(){

show("welcome");

}

document.addEventListener("keydown",(e)=>{

const map = {
1:0,
2:1,
3:2,
4:3
};

if(map[e.key] !== undefined){

let btns =
document.querySelectorAll("#options button");

if(btns[map[e.key]]){

btns[map[e.key]].click();

}

}

});

const qno =
document.getElementById("qno");

const question =
document.getElementById("question");

const options =
document.getElementById("options");

const next =
document.getElementById("next");

const scoreEl =
document.getElementById("score");

const bar =
document.getElementById("bar");

const timeEl =
document.getElementById("time");

const arc =
document.getElementById("arc");

const final =
document.getElementById("final");

const title =
document.getElementById("title");

window.onload = ()=>{

const year = new Date().getFullYear();

console.log("Quiz Loaded Successfully");

console.log("Current Year:",year);

};