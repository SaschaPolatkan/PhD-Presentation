const pages = [
    "PhDPresentation.html",
    "Titlepage.html",
    "LoC.html",
    "Intro_Graphene.html",
    "Intro_TIs.html",
    "Intro_TIs2.html",
    "Intro_Weyl.html",
    "Intro_Dirac_Monopoles.html",
    "LLsIntro.html",
    "LLsParabIntro.html",
    "LLsLinearIntro.html",
    "LLsChiralAnomaly0.html",
    "LLsChiralAnomaly1.html",
    "LLsChiralAnomaly2.html",
    "Setup.html",
    "Setup_HF.html",
    "TaP_Intro.html",
    "TaP_Intro2.html",
    "TaP_Meas.html",
    "TaP_LLsPara.html",
    "TaP_ModelNL.html",
    "TaP_ModelFull.html",
    "TaP_Results.html",
    "GdPtBi_Intro.html",
    "GdPtBi_Hirschberger.html",
    "GdPtBi_Unconstrained_LGL.html",
    "GdPtBi_Experiment.html",
    "GdPtBi_Zeeman.html",
    "GdPtBi_ZeemanAnim.html",
    "GdPtBi_ZeemanAnim2.html",
    "GdPtBi_Constrained.html",
    "GdPtBi_Hamiltonian.html",
    "GdPtBi_ExpTheo.html",
    "Summary.html",
    "Questions.html"
];

document.body.onload = addPageSearchField();
function addPageSearchField() {
  // create a new div element
  document.body.innerHTML +='<input type="number" id="page-search" max="10" maxlength="10" style="position:absolute; border:none; font-size:2rem; right:4vw; top:5vh; width:1.3em; z-index:-1;" />'
  /* document.body.innerHTML +='<input type="number" id="page-search" max="1" maxlength="1" style="position:absolute;  font-size:2rem; right:4vw; top:5vh; width:1.3em; z-index:10;" />' */
}


document.body.onload = addPageNumberField;
function addPageNumberField() {
    // create a new div element
    //document.body.innerHTML +='<input type="number" id="page-number" max="1" maxlength="1" style="position:absolute; border:none; font-size:2rem; right:4vw; top:5vh; width:1.3em; z-index:-1;" />'
    document.body.innerHTML +='<p id="page-number" style="position:absolute; border:none; font-size:1rem; right:1vw; bottom:3vh; width:1.3em; z-index:100;"> a </p>'
    let currentpath = window.location.pathname;
    let currentpage = currentpath.split("/").pop();
    let currentindex = pages.indexOf(currentpage);
    let paragraph = document.getElementById("page-number");
    paragraph.textContent=currentindex;
    //the commands below allow to add text rather than to set text
    //var text = document.createTextNode("b");
    //paragraph.appendChild(text);
  }


document.addEventListener("keydown", (evt) => {
    if (evt.isComposing ) {
        return;
    }
    if (typeof pageNavOff == 'undefined') {
        pagenav(evt);
        buttonnav(evt);
    } else if(pageNavOff == 'True' || pageNavOff == 'true'){
        return;
    } else{ //in case we define pagenaveoff, but give it the wrong string value, it will use default behaviour and turn on pagenav
        pagenav(evt);
        buttonnav(evt);
    }
    
        
    }); 

function pagenav(evt) {
    evt = evt || window.evt;
    let currentpath = window.location.pathname;
    let currentpage = currentpath.split("/").pop();
    let currentindex = pages.indexOf(currentpage);
    let maxpages = pages.length;
    var isRight = false;
    var isLeft = false;
    let accnum= ""; 
    /* if ("key" in evt) {isUp = (evt.keyCode === 38);}
    if (isUp) {document.location.href =pages[currentindex-1];} */
    //if (isUp) {document.getElementById('page-number').value = currentindex;}
    /* if ("key" in evt) {isDn = (evt.keyCode === 40);}
    if (isDn) {window.location.href =pages[currentindex+1];}  */
    if (evt.key=="ArrowUp"&&currentindex>0) {window.location.href =pages[currentindex-1];}
    if (evt.key=="ArrowDown"&&currentindex<maxpages-1) {window.location.href =pages[currentindex+1];}


    if (evt.key=="h") {document.location.href ="LoC.html";}
    

    let isNumber = /^[0-9]$/i.test(evt.key);
    //let num=Number(evt.key);
    if(isNumber){
        document.getElementById('page-search').style.zIndex = '100';
        document.getElementById('page-search').focus();
    };
    let pagenum = document.getElementById('page-search').value
    if (evt.key=="Enter"&& pagenum<pages.length&&pagenum!=""){goToPage()}
    if (evt.key=="Enter"&& pagenum>=pages.length){
        document.getElementById('page-search').value = ''; 
        document.getElementById('page-search').blur();}

    /* 
    This command ensures that I can press enter on the buttons at the Start page 
    Without this, the number field will get blurred and the left and right buttons too, when pressing Enter
    Note that this command has to be at the end, otherwise it prevents the use of the page navigation
    */
    
};



function goToPage(){
    var pagenum=document.getElementById('page-search').value; // value of input box
    pagenum=pagenum*1; // ensures page is numeric only
    pagelink=pages[pagenum];
    location.href=pagelink; // redirect to new url
}

/* <input type="number" id="page-number" max="1" maxlength="1" style="position:absolute; font-size:2rem; right:4vw; top:5vh; width:2em;" />
 */





function focusNextButton() {
    var focussable = Array.prototype.filter.call(document.querySelectorAll('.btn'),
    function(element) {
        return element.offsetWidth > 0 || element.offsetHeight > 0 || element === document.activeElement
    }); 
    var index = focussable.indexOf(document.activeElement);
    focussable[index + 1].focus();
};

function focusPreviousButton() {
    var focussable = Array.prototype.filter.call(document.querySelectorAll('.btn'),
    function(element) {
        return element.offsetWidth > 0 || element.offsetHeight > 0 || element === document.activeElement
    });
    var index = focussable.indexOf(document.activeElement);
    focussable[index - 1].focus();
};

function buttonnav(evt) {
    evt = evt || window.evt;
    var isRight = false;
    var isLeft = false;
    if ("key" in evt) {isLeft = (evt.keyCode === 37);}
    if (isLeft) {focusPreviousButton();}
    if ("key" in evt) {isRight = (evt.keyCode === 39);}
    if (isRight) {focusNextButton();}
};
