/****** Navbar ************/

let toggleBtn = document.querySelector(".toggle-btn")
let navItems = document.querySelector(".nav_items")
let list = document.querySelector(".list")
//This gets the height of the nav-items and list
let navItemsHeight = navItems.getBoundingClientRect().height;
let listHeight = list.getBoundingClientRect().height;
// This code handles the openning and closing of the navbar
let openNav = document.querySelector(".open")
let closeNav = document.querySelector(".close")

toggleBtn.addEventListener("click",toggleNavbar);
function toggleNavbar() {
    if(openNav.classList.contains("show-toggle-btn") && navItemsHeight === 0) {
        openNav.classList.remove("show-toggle-btn");
        closeNav.classList.add("show-toggle-btn");
        navItems.style.height = `${listHeight}px`;
    } else {
        closeNav.classList.remove("show-toggle-btn");
        openNav.classList.add("show-toggle-btn");
        navItems.style.height = 0;
    }
};


window.addEventListener("resize", checkScreenWidth)/* The checkScreenWidth function closes the navbar when it is open 
at the screen width of 550px and above */

function checkScreenWidth () {
    const screenWidth = window.innerWidth
    if(screenWidth >= 550) {
        navItems.style.height = 0;
        navItems.style.transition = "none";
        closeNav.classList.remove("show-toggle-btn")
        openNav.classList.add("show-toggle-btn")
    } else {
        navItems.style.transition = 0.3+'s'
    }
}


/* ********FIXED NAVBAR and Arrow Link******** */

/*This code makes the navbar to be fixed if you scroll past
the height of the navbar*/
let navbar = document.querySelector(".nav_bar")
let arrowLink = document.querySelector(".arrow")

window.addEventListener("scroll",()=>{
    let navbarHeight = navbar.getBoundingClientRect().height
    let scrollHeight = window.pageYOffset; //pageYOffset returns the number of pixel the webpage has being scrolled vertically
    console.log(scrollHeight)
    if(scrollHeight > navbarHeight) {
        navbar.classList.add("fixed-navbar")
    }else {
        navbar.classList.remove("fixed-navbar")
    }
    
    if(scrollHeight > 200){
        arrowLink.classList.add("show-arrow")
    } else {
        arrowLink.classList.remove("show-arrow")
    }
})


/* ********Scroll Effect************ */
/*This code is to terminate the default scroll settings and add a scroll setting that
would make the sections stop exactly under the navbar when the links are clicked*/
let scrollLink = document.querySelectorAll(".scroll-link")
scrollLink.forEach(link =>{
    link.addEventListener("click",(e)=>{
        e.preventDefault() //Prevent default
        let id = e.currentTarget.getAttribute("href").slice(1) //Navigate to specific spot
        let element = document.getElementById(id) //gets the id that is similar to the value stored in the variable
        
        let navHeight = navbar.getBoundingClientRect().height //Calculate the height of navbar and navItems
        let navItemsHeight = navItems.getBoundingClientRect().height

        let fixedNav = navbar.classList.contains("fixed-nav")
        let position = element.offsetTop - navHeight

        //For smaller screen
        if(navHeight > 82) {
            position = position + navItemsHeight
        }
        window.scrollTo({
            left: 0,
            top: position,
        })
        navItems.style.height = 0;
        closeNav.classList.remove("show-toggle-btn");
        openNav.classList.add("show-toggle-btn");

        
    })
})




/*************** About page *****************/

// About page texts
let btnContainer = document.querySelector(".btn_container")
let aboutBtns = document.querySelectorAll(".about_btn_style")
let aboutContents = document.querySelectorAll(".about_content")

aboutBtns.forEach(btn =>{
    btn.addEventListener("click",(e)=>{
        let clicked = e.target.classList.contains("active")
        let activeBtn = btnContainer.querySelector(".active")
        if(!clicked){
            activeBtn.classList.remove("active")
            e.target.classList.add("active")
        }
                
        let targetId = e.target.getAttribute("data-target")
        let targetContent = document.getElementById(targetId)
        aboutContents.forEach(content => {
            content.classList.remove("active")
        })
        targetContent.classList.add("active")
    })
})

// About page gallery 
const galleryContainer = document.querySelector('.gallery_container');
const galleryControlsContainer = document.querySelector('.gallery_controls');
const galleryControls = ['previous', 'next'];
const galleryItems = document.querySelectorAll('.gallery_item');

class carousel {
    constructor(container, items, controls) {
        this.carouselContainer = container;
        this.carouselControls = controls;
        this.carouselArray = [...items];
    }

    updateGallery() {
        this.carouselArray.forEach(el => {
            el.classList.remove('gallery_item1');
            el.classList.remove('gallery_item2');
            el.classList.remove('gallery_item3');
            el.classList.remove('gallery_item4');
            el.classList.remove('gallery_item5');
        })

        this.carouselArray.slice(0, 5).forEach((el, i) => {
            el.classList.add(`gallery_item${i+1}`); 
        })
    }

    setCurrentState(direction) {
        if (direction.classList == "gallery_controlsprevious") {
            this.carouselArray.unshift(this.carouselArray.pop());
        } else {
            this.carouselArray.push(this.carouselArray.shift());
        }
        this.updateGallery();
    }

    setControls() {
        this.carouselControls.forEach(control => {
            galleryControlsContainer.appendChild(document.createElement("button")).className = `gallery_controls${control}`;
            document.querySelector(`.gallery_controls${control}`).innerText = control;
        })
    }
    useControls() {
        const triggers = [...galleryControlsContainer.childNodes]
        triggers.forEach(control => {
            control.addEventListener("click", e => {
                e.preventDefault();
                this.setCurrentState(control);
            })
        })
    }
};

const exampleCarousel = new carousel(galleryContainer, galleryItems, galleryControls);

exampleCarousel.setControls();
exampleCarousel.useControls();


window.addEventListener("scroll", reveal);
function reveal(){
    let reveals = document.querySelectorAll(".reveal")

    reveals.forEach(reveal => {
        let windowHeight = window.innerHeight; // This is the height of the viewport
        let revealtop = reveal.getBoundingClientRect().top;
        let revealpoint = 150;

        if(revealtop < windowHeight - revealpoint){
            reveal.classList.add("active")
        }else{
            reveal.classList.remove("active")
        }
    })
};             


                                 


                                
