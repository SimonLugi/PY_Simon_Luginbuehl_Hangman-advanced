function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}
 
class Sidebar {
    constructor() {
        this.sidebar = document.querySelector('.sidebar');
        this.openButton = document.querySelector('.openSidebarLink');
        this.closeButton = document.querySelector('.closeButtonSidebar');
        this.toggleSidebarButton = document.querySelector('.toggleSidebarButton');
 
        // Initialize event listeners
        this.isInitialized = false;
        this.initEventListeners();
    }
 
    initEventListeners() {
        if (this.isInitialized) return; // Prevent multiple initializations
 
        // Add event listeners if elements exist
        if (this.openButton) {
            this.openButton.addEventListener('click', this.openSidebar.bind(this));
        }
        if (this.closeButton) {
            this.closeButton.addEventListener('click', this.closeSidebar.bind(this));
        }
        if (this.toggleSidebarButton) {
            this.toggleSidebarButton.addEventListener('click', this.toggleSidebar.bind(this));
        }
 
        this.closeTimeout = null; // Initialize a timeout variable
 
        // Add event listener for clicks outside the sidebar
        window.addEventListener('click', this.handleClickOutside.bind(this));
 
        this.isInitialized = true; // Mark listeners as initialized
    }
 
    toggleSidebar(event) {
        console.log("toggle sidebar");
        clearTimeout(this.closeTimeout); 
        this.sidebar.classList.toggle('open');
    }
 
    openSidebar(event) {
        console.log("open sidebar");
        if (!this.sidebar.classList.contains('open')) {
            this.sidebar.classList.add('open');
        }
    }
 
    closeSidebar(event) {
        console.log("close sidebar");
        if (this.sidebar.classList.contains('open')) {
            this.sidebar.classList.remove('open');
        }
    }
    handleClickOutside(event) {
        if (!this.sidebar.contains(event.target) && 
            !this.openButton.contains(event.target) && 
            !this.toggleSidebarButton.contains(event.target)) {
            this.closeSidebar();
        }
    }
}
 
// Wait for the DOM to load before creating the Sidebar object
document.addEventListener('DOMContentLoaded', () => {
    const sidebar = new Sidebar();
	window.sidebarInstance = sidebar; 
});