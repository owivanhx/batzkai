var CATS=["Romance","Poesia","Infantil","Didático"];
var COLS=["#ffbe0b","#ffd9de","#cfe8ff","#d8f0d2","#e6dcff"];
var st={view:"home",cat:"",tab:"cesta",cart:[],books:[],orders:[],mine:[],reviews:[],user:null,pending:null,theme:"auto"};
var $=function(i){return document.getElementById(i)};
function el(tag,cls,txt){var x=document.createElement(tag);if(cls)x.className=cls;if(txt!=null)x.textContent=txt;return x}
function brl(v){return v?v.toLocaleString("pt-BR",{style:"currency",currency:"BRL"}):"Grátis"}
function toast(t){var e=$("toast");e.textContent=t;e.hidden=false;clearTimeout(toast.t);toast.t=setTimeout(function(){e.hidden=true},2400)}
function btn(txt,cls,fn){var b=el("button","btn "+(cls||""),txt);b.type="button";b.onclick=fn;return b}
function go(v){st.view=v;render()}
function money(c){return brl(c/100)}
function msg(e){return (e.details&&e.details[0])||e.message}

/* ---------- API ---------- */
function api(path,method,body){
 return fetch("/api"+path,{method:method||"GET",credentials:"same-origin",headers:{"Content-Type":"application/json","X-Requested-With":"feirao"},body:body?JSON.stringify(body):undefined})
 .then(function(r){return r.json().catch(function(){return{}}).then(function(d){if(!r.ok){var e=new Error(d.error||"Erro inesperado");e.details=d.details;throw e}return d})});
}
function applyTheme(){var t=st.user?st.user.settings.theme:st.theme,r=document.documentElement;if(t==="auto")r.removeAttribute("data-theme");else r.setAttribute("data-theme",t)}
function loadMe(){return api("/me").then(function(d){st.user=d.user;applyTheme();render()}).catch(function(){render()})}

/* ---------- Diálogos ---------- */
function field(id,lab,tag,a){var w=document.createDocumentFragment(),l=el("label",null,lab);l.htmlFor=id;var i=document.createElement(tag);i.id=id;
 for(var k in a){if(k==="options")a[k].forEach(function(o){var op=el("option",null,o[1]);op.value=o[0];i.appendChild(op)});else if(k==="val")i.value=a[k];else i.setAttribute(k,a[k])}
 w.appendChild(l);w.appendChild(i);return w}
function dialog(title,fields,onOk,opt){
 opt=opt||{};$("dt").textContent=title;$("de").textContent="";var f=$("df");f.textContent="";
 fields.forEach(function(x){f.appendChild(field(x[0],x[1],x[2],x[3]))});
 $("ok").textContent=opt.ok||"Salvar";var alt=$("alt");alt.hidden=!opt.alt;
 if(opt.alt){alt.textContent=opt.alt[0];alt.onclick=function(){$("dlg").close();opt.alt[1]()}}
 $("ok").onclick=function(){$("ok").disabled=true;Promise.resolve(onOk()).then(function(e){$("ok").disabled=false;if(e)$("de").textContent=e;else $("dlg").close()})};
 $("no").onclick=function(){st.pending=null;$("dlg").close()};
 $("dlg").showModal();
}
$("f").addEventListener("submit",function(e){e.preventDefault()});
function v(id){return $(id).value.trim()}

function authDlg(mode){
 var reg=mode==="register";
 var fs=(reg?[["uN","Nome","input",{maxlength:80,autocomplete:"name"}]]:[]).concat([
  ["uE","E-mail","input",{type:"email",maxlength:120,autocomplete:"email"}],
  ["uP","Senha"+(reg?" (mínimo 10 caracteres)":""),"input",{type:"password",maxlength:72,autocomplete:reg?"new-password":"current-password"}]]);
 dialog(reg?"Criar conta":"Entrar para continuar",fs,function(){
  var body=reg?{name:v("uN"),email:v("uE"),password:$("uP").value}:{email:v("uE"),password:$("uP").value};
  return api("/auth/"+(reg?"register":"login"),"POST",body).then(function(){return api("/me")}).then(function(d){
   st.user=d.user;applyTheme();
   var p=st.pending;st.pending=null;toast("Bem-vinda(o), "+st.user.name.split(" ")[0]);
   return loadAll().then(function(){return p?addToCart(p):null}).then(function(){return ""})}).catch(msg);
 },{ok:reg?"Criar conta":"Entrar",alt:reg?["Já tenho conta",function(){authDlg("login")}]:["Ainda não tenho conta",function(){authDlg("register")}]});
}
function need(fn){return function(){if(!st.user){authDlg("login");return}fn.apply(null,arguments)}}

var PRON=[["","Prefiro não informar"],["ela/dela","ela/dela"],["ele/dele","ele/dele"],["elu/delu","elu/delu"]];
var COLORS=[["#1a159e","Azul royal"],["#e63946","Vermelho"],["#0a8f6a","Verde"],["#6a3fc9","Roxo"],["#181828","Preto"]];
var editProfile=need(function(){
 var u=st.user;
 dialog("Configuração do perfil",[
  ["pN","Nome","input",{maxlength:80,val:u.name}],["pPr","Pronome","select",{options:PRON,val:u.pronoun}],
  ["pPh","Telefone","input",{type:"tel",maxlength:25,val:u.phone}],["pAd","Endereço","input",{maxlength:200,val:u.address}],
  ["pB","Sobre você","textarea",{rows:3,maxlength:300,val:u.bio}],["pC","Cor do avatar","select",{options:COLORS,val:u.avatar_color}],
  ["pE","E-mail","input",{type:"email",maxlength:120,val:u.email}],["pS","Senha atual (só para trocar o e-mail)","input",{type:"password",maxlength:72,autocomplete:"current-password"}]
 ],function(){
  var email=v("pE").toLowerCase(),chg=email!==u.email;
  if(chg&&!$("pS").value)return "Digite a senha atual para trocar o e-mail.";
  return api("/me/profile","PATCH",{name:v("pN"),pronoun:$("pPr").value,phone:v("pPh"),address:v("pAd"),bio:v("pB"),avatar_color:$("pC").value})
   .then(function(){return chg?api("/me/email","PATCH",{email:email,password:$("pS").value}):null})
   .then(loadMe).then(function(){toast("Perfil atualizado");return ""}).catch(msg);
 });
});
function saveSettings(ch){
 if(!st.user){if(ch.theme)st.theme=ch.theme;applyTheme();render();return Promise.resolve("")}
 var s=Object.assign({},st.user.settings,ch);
 return api("/me/settings","PATCH",s).then(loadMe).then(function(){toast("Configurações salvas");return ""}).catch(msg);
}
function prefsDlg(){
 var s=st.user?st.user.settings:{theme:st.theme};
 var fs=[["sT","Tema","select",{options:[["auto","Automático"],["light","Claro"],["dark","Escuro"]],val:s.theme}]];
 if(st.user)fs.push(["sN","Notificações","select",{options:[["true","Ligadas"],["false","Desligadas"]],val:String(s.notifications)}],
  ["sL","Idioma","select",{options:[["pt-BR","Português"],["en","English"],["es","Español"]],val:s.language}]);
 dialog("Preferências",fs,function(){var ch={theme:$("sT").value};if(st.user){ch.notifications=$("sN").value==="true";ch.language=$("sL").value}return saveSettings(ch)});
}
var privDlg=need(function(){
 var s=st.user.settings,o=[["all","Todos"],["me","Só eu"]];
 dialog("Privacidade",[["vB","Quem pode ver meus livros à venda","select",{options:o,val:s.show_books}],["vR","Quem pode ver minhas avaliações","select",{options:o,val:s.show_reviews}]],
  function(){return saveSettings({show_books:$("vB").value,show_reviews:$("vR").value})});
});
var anunciar=need(function(){dialog("Anunciar ou doar livro",[
 ["aT","Título","input",{maxlength:80}],["aA","Autor","input",{maxlength:60}],
 ["aC","Categoria","select",{options:CATS.map(function(c){return[c,c]})}],
 ["aK","Estado do livro","select",{options:[["Como novo","Como novo"],["Bom estado","Bom estado"],["Com marcas","Com marcas"]],val:"Bom estado"}],
 ["aP","Preço em R$ (0 para doar)","input",{type:"number",min:0,step:"0.01"}]],function(){
 var t=v("aT"),p=parseFloat($("aP").value);
 if(t.length<2)return"Digite o título do livro.";if(!(p>=0))return"Digite um preço (0 para doação).";
 return api("/books","POST",{title:t,author:v("aA"),category:$("aC").value,book_condition:$("aK").value,price_cents:Math.round(p*100)})
  .then(refresh).then(function(){toast(p?"Livro publicado":"Doação publicada");return ""}).catch(msg)})});
var resenha=need(function(){dialog("Nova resenha",[["rT","Livro","input",{maxlength:80}],["rX","Sua opinião","textarea",{rows:4,maxlength:500}]],function(){
 return api("/reviews","POST",{book_title:v("rT"),body:v("rX")}).then(loadReviews).then(render).then(function(){toast("Resenha publicada");return ""}).catch(msg)})});

/* ---------- Dados do servidor ---------- */
function loadBooks(){return api("/books?category="+encodeURIComponent(st.cat)).then(function(d){st.books=d}).catch(function(){})}
function loadCart(){return api("/cart").then(function(d){st.cart=d})}
function loadOrders(){return api("/orders").then(function(d){st.orders=d})}
function loadMine(){return api("/me/books").then(function(d){st.mine=d})}
function loadReviews(){return api("/me/reviews").then(function(d){st.reviews=d})}
function loadUserData(){return st.user?Promise.all([loadCart(),loadOrders(),loadMine(),loadReviews()]).catch(function(){}):Promise.resolve()}
function loadAll(){return Promise.all([loadMe(),loadBooks()]).then(loadUserData).then(render)}
function refresh(){return Promise.all([loadBooks(),loadUserData()]).then(render)}
function addToCart(id){return api("/cart/"+id,"PUT").then(loadCart).then(function(){toast("Na cestinha");render()}).catch(function(e){toast(msg(e));return refresh()})}
function pay(id){return api("/orders/"+id+"/pay","POST").then(function(d){
 if(d.checkout_url){location.href=d.checkout_url;return}
 toast(d.simulated?"Pagamento simulado (modo de teste)":"Pedido confirmado");st.tab="ship";return refresh()}).catch(function(e){toast(msg(e));return refresh()})}
function act(path,ok){return function(){api("/orders/"+path,"POST").then(function(){toast(ok);return refresh()}).catch(function(e){toast(msg(e))})}}

/* ---------- Telas ---------- */
function home(m){
 var bn=el("div","banner");bn.appendChild(el("b",null,"50%"));
 var tx=el("div");tx.appendChild(el("strong",null,"OFF em livros usados"));
 var sm=el("small");sm.appendChild(el("span","tag","Info"));sm.appendChild(el("span","tag new","NEW"));tx.appendChild(sm);bn.appendChild(tx);
 var ver=btn("veja","y",function(){st.cat="Romance";loadBooks().then(render)});ver.style.marginLeft="auto";bn.appendChild(ver);m.appendChild(bn);
 var ch=el("div","chips");CATS.forEach(function(c){var b=el("button","chip",c);b.type="button";b.setAttribute("aria-pressed",String(st.cat===c));b.onclick=function(){st.cat=st.cat===c?"":c;loadBooks().then(render)};ch.appendChild(b)});m.appendChild(ch);
 if(st.cat){var f=el("div","filt");f.appendChild(el("span",null,"Filtro ativo: "+st.cat));f.appendChild(btn("Limpar","o",function(){st.cat="";loadBooks().then(render)}));m.appendChild(f)}
 var g=el("div","grid");
 if(!st.books.length)g.appendChild(el("div","empty","Nenhum livro por aqui ainda. Que tal anunciar o primeiro no seu perfil?"));
 st.books.forEach(function(b){
  var d=el("article","book"),cv=el("div","cover",b.title);cv.style.background=COLS[b.id%COLS.length];
  var k=el("div","bk");k.appendChild(el("h3",null,b.title));k.appendChild(el("div","m",b.author||"Autor não informado"));k.appendChild(el("div","m",b.book_condition+" · "+b.seller));
  k.appendChild(el("div","pr"+(b.price_cents?"":" free"),money(b.price_cents)));
  var inCart=st.cart.some(function(x){return x.id===b.id}),mine=st.user&&b.seller_id===st.user.id;
  var bt=btn(mine?"Seu anúncio":inCart?"Na cestinha":b.price_cents?"Pôr na cestinha":"Pegar","y",function(){
   if(!st.user){st.pending=b.id;authDlg("login");return}  /* só pede login se a pessoa ainda não entrou */
   addToCart(b.id)});
  bt.disabled=!!(mine||inCart);k.appendChild(bt);d.appendChild(cv);d.appendChild(k);g.appendChild(d)});
 m.appendChild(g);
}
function orderCard(o,btns){var r=el("div","row"),l=el("div");l.appendChild(el("div","t","Pedido #"+o.id+" · "+money(o.total_cents)));
 l.appendChild(el("div","m",o.items.map(function(i){return i.title}).join(", ")));r.appendChild(l);
 var a=el("div");btns.forEach(function(b){a.appendChild(b)});r.appendChild(a);return r}
function cesta(m){
 var tabs=el("div","tabs");[["cesta","cestinha"],["ship","enviando"],["bought","compras"],["refund","reembolso"]].forEach(function(t){var b=el("button","chip",t[1]);b.type="button";b.setAttribute("aria-pressed",String(st.tab===t[0]));b.onclick=function(){st.tab=t[0];render()};tabs.appendChild(b)});m.appendChild(tabs);
 if(!st.user){m.appendChild(el("p","m","Entre na sua conta para ver a cestinha e os pedidos."));m.appendChild(btn("Entrar","y",function(){authDlg("login")}));return}
 if(st.tab==="cesta"){
  var sum=0;
  if(!st.cart.length)m.appendChild(el("p","m","Sua cestinha está vazia. Escolha um livro no início."));
  st.cart.forEach(function(b){sum+=b.price_cents;var r=el("div","row"),l=el("div");l.appendChild(el("div","t",b.title));l.appendChild(el("div","m",(b.author||"")+" · "+money(b.price_cents)));r.appendChild(l);
   r.appendChild(btn("Remover","o",function(){api("/cart/"+b.id,"DELETE").then(loadCart).then(render)}));m.appendChild(r)});
  if(st.cart.length){var t=el("div","total");t.appendChild(el("span",null,"Total"));t.appendChild(el("span",null,money(sum)));m.appendChild(t);
   m.appendChild(btn(sum?"Finalizar e pagar":"Confirmar doação","y",function(){
    api("/orders","POST").then(function(o){if(o.status==="paid"){toast("Pedido confirmado");st.tab="ship";return refresh()}return pay(o.order_id)}).catch(function(e){toast(msg(e));return refresh()})}))}
  st.orders.filter(function(o){return o.status==="pending_payment"}).forEach(function(o){
   m.appendChild(orderCard(o,[btn("Pagar","y",function(){pay(o.id)}),btn("Cancelar","o",act(o.id+"/cancel","Pedido cancelado"))]))});
  return}
 var map={ship:["paid","shipped"],bought:["delivered"],refund:["refund_requested"]},list=st.orders.filter(function(o){return map[st.tab].indexOf(o.status)>-1});
 if(!list.length)m.appendChild(el("p","m",{ship:"Nenhum pedido a caminho.",bought:"Você ainda não concluiu compras.",refund:"Nenhum reembolso solicitado."}[st.tab]));
 list.forEach(function(o){var b=[];
  if(st.tab==="ship")b.push(btn("Recebi","o",act(o.id+"/received","Entrega confirmada")));
  if(st.tab==="bought")b.push(btn("Pedir reembolso","o",act(o.id+"/refund","Reembolso solicitado")));
  m.appendChild(orderCard(o,b))});
}
function item(m,txt,sub,fn){var r=el("button","row link");r.type="button";var l=el("div");l.appendChild(el("div","t",txt));l.appendChild(el("div","m",sub));r.appendChild(l);r.appendChild(el("span",null,"›"));r.onclick=fn;m.appendChild(r)}
function config(m){
 m.appendChild(el("h2",null,"Configurações"));
 item(m,"preferências","Tema escuro, notificações e idioma",prefsDlg);
 item(m,"configuração do perfil","Mudar endereço, e-mail, telefone e pronome",editProfile);
 item(m,"contas de cartão","Pagamentos rápidos: ficam no gateway, nunca neste site",function(){toast("Em breve, junto com o Mercado Pago")});
 item(m,"privacidade","Definir quem pode ver seus livros à venda ou avaliações",privDlg);
}
function initials(n){return n.split(/\s+/).slice(0,2).map(function(w){return w[0]}).join("").toUpperCase()}
function perfil(m){
 if(!st.user){m.appendChild(el("h2",null,"Perfil"));m.appendChild(el("p","m","Entre para ter seu perfil, anunciar livros e escrever resenhas."));
  m.appendChild(btn("Entrar","y",function(){authDlg("login")}));m.appendChild(document.createTextNode(" "));m.appendChild(btn("Criar conta","o",function(){authDlg("register")}));return}
 var u=st.user,me=el("div","me"),av=el("div","av",initials(u.name));av.style.background=u.avatar_color;me.appendChild(av);
 var d=el("div");d.appendChild(el("div","t",u.name));d.appendChild(el("div","m",(u.pronoun?u.pronoun+" · ":"")+u.email));
 if(u.phone)d.appendChild(el("div","m",u.phone));if(u.address)d.appendChild(el("div","m",u.address));if(u.bio)d.appendChild(el("p",null,u.bio));me.appendChild(d);m.appendChild(me);
 m.appendChild(btn("Editar perfil","y",editProfile));m.appendChild(document.createTextNode(" "));
 m.appendChild(btn("Sair","o",function(){api("/auth/logout","POST").then(function(){st.user=null;st.cart=[];st.orders=[];st.mine=[];st.reviews=[];applyTheme();toast("Você saiu");go("home")})}));
 var h=el("h2",null,"livros");h.appendChild(btn("+ Anunciar / Doar","y",anunciar));m.appendChild(h);
 if(!st.mine.length)m.appendChild(el("p","m","Você ainda não anunciou nada."));
 st.mine.forEach(function(b){var r=el("div","row"),l=el("div");l.appendChild(el("div","t",b.title));l.appendChild(el("div","m",money(b.price_cents)+" · "+({available:"à venda",reserved:"reservado",sold:"vendido"}[b.status]||b.status)));r.appendChild(l);
  if(b.status==="available")r.appendChild(btn("Remover","o",function(){api("/books/"+b.id,"DELETE").then(refresh).catch(function(e){toast(msg(e))})}));m.appendChild(r)});
 var h2=el("h2",null,"resenha");h2.appendChild(btn("+ Nova resenha","y",resenha));m.appendChild(h2);
 if(!st.reviews.length)m.appendChild(el("p","m","Escreva sua primeira resenha."));
 st.reviews.forEach(function(r){var w=el("div","row"),l=el("div");l.appendChild(el("div","t",r.book_title));l.appendChild(el("div","m",r.body));w.appendChild(l);m.appendChild(w)});
}
function render(){
 var m=$("v");m.textContent="";({home:home,cesta:cesta,config:config,perfil:perfil})[st.view](m);
 var n=$("nav");n.textContent="";
 [["home","🏠","Início"],["cesta","🧺","Cestinha"],["config","⚙️","Configurações"],["perfil","👤","Perfil"]].forEach(function(i){
  var b=el("button");b.type="button";if(st.view===i[0])b.setAttribute("aria-current","page");b.appendChild(el("span",null,i[1]));b.appendChild(document.createTextNode(i[2]));
  if(i[0]==="cesta")b.appendChild(el("i","bd",st.cart.length?String(st.cart.length):""));
  b.onclick=function(){go(i[0])};n.appendChild(b)});
}
if(location.hash==="#pedido-ok"){st.view="cesta";st.tab="ship";history.replaceState(null,"",location.pathname)}
render();loadAll();
