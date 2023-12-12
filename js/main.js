"use strict";
const menu = document.querySelector(".menu");
let subMenu;

function menuMain() {
    $(".menu-main").click(function (e) {
        if (e.target.closest(".menu-item-has-children")) {
            const hasChildren = e.target.closest(".menu-item-has-children");
            showSubMenu(hasChildren); // need discussion
        }
    })
}

function goBack() {
    $(".go-back").click(function () {
        hideSubMenu();
    })
}

function menuTrigger() {
    $(".mobile-menu-trigger").click(function () {
        toggleMenu();
    })
}

function closeMenu() {
    $(".mobile-menu-close").click(function () {
        toggleMenu();
    })
}

function menuOverlay() {
    $(".menu-overlay").click(function () {
        toggleMenu();
    })
}
function toggleMenu() {
    $(".menu").toggleClass("active");
    $(".menu-overlay").toggleClass("active");
}

function showSubMenu(hasChildren) {
    subMenu = hasChildren.querySelector(".sub-menu");
    subMenu.classList.add("active");
    subMenu.style.animation = "slideLeft 0.5s ease forwards";
    const menuTitle = hasChildren.querySelector("i").parentNode.childNodes[0].textContent;
    $(".menu .mobile-menu-head").addClass("active");
    $(".menu .current-menu-title").text(menuTitle);
    $(".menu .mobile-menu-head").addClass("active");
}

function hideSubMenu() {
    subMenu.style.animation = "slideRight 0.5s ease forwards";
    setTimeout(() => {
        subMenu.classList.remove("active");
    }, 300);
    menu.querySelector(".mobile-menu-head").classList.remove("active");
    $(".menu .current-menu-title").text("");
    $(".menu .mobile-menu-head").removeClass("active");
}

window.onresize = function () {
    if (this.innerWidth > 991) {
        if ($(".menu").hasClass("active")) {
            toggleMenu();
        }
    }
}

function searchIcon() {
    $('#search-icon').click(function () {
        $('#search-icon i').toggleClass("fa-times");
        $('.search-form').toggleClass("active");
        $(".menu").removeClass("fa-times");
    })
    $('.search-icons').keypress(function (event) {
        var id = event.keyCode;
        if (id == 13) {
            $('#search-icon').trigger('click');
        }
    });
}

window.onscroll = () => {
    $(".menu").removeClass("fa-times");

}

//Main menu 
$(document).ready(function () {
    var timeVal = $("#ToastTime").val();
    setTimeout(function () {
        if ($('.toast-notification').length > 0) {
            $('.toast-notification').remove();
        }
    }, parseInt(timeVal) * 1000);

    if ($('.toast-notification').length > 0) {
        $(".toast-notification .close-toast").click(function (e) {
            e.preventDefault();
            $(".toast-notification").remove();
        });
    }

    //Filter and Sorting
    $("#btnsubmit").on("click", function () {        
        var topicarr = [];
        for (var i = 0; i < $(".modal-topic-list li[select='true']").length; i++) {
            var x = document.querySelectorAll(".modal-topic-list li[select='true']")[i].getAttribute("data-value");
            topicarr.push(x);
        }
        var statusarr = [];
        for (var i = 0; i < $(".modal-status-list li[select='true']").length; i++) {
            var x = document.querySelectorAll(".modal-status-list li[select='true']")[i].getAttribute("data-value");
            statusarr.push(x);
        }
        var timearr = [];
        for (var i = 0; i < $(".modal-time-list li[select='true']").length; i++) {
            var x = document.querySelectorAll(".modal-time-list li[select='true']")[i].getAttribute("data-value");
            timearr.push(x);
        }
        var contentarr = [];
        for (var i = 0; i < $(".modal-content-list li[select='true']").length; i++) {
            var x = document.querySelectorAll(".modal-content-list li[select='true']")[i].getAttribute("data-value");
            contentarr.push(x);
        }

        if ($("#contentTypeForm").length > 0) {
            $("#SelectedTopicFilter").val(topicarr.toString());
            $("#SelectedStatusFilter").val(statusarr.toString());
            $("#SelectedTimeFilter").val(timearr.toString());
            $("#contentTypeForm").trigger("submit");
        }
        if ($("#newsCentreForm").length > 0) {
            $("#SelectedTopicFilter").val(topicarr.toString());
            $("#SelectedContentFilter").val(contentarr.toString());
            $("#SelectedTimeFilter").val(timearr.toString());
            $("#newsCentreForm").trigger("submit");
        }
        if ($("#subTopicForm").length > 0) {
            $("#SelectedContentFilter").val(contentarr.toString());
            $("#subTopicForm").trigger("submit");
        }
        if ($("#searchForm").length > 0) {
            $("#SelectedTopicFilter").val(topicarr.toString());
            $("#SelectedContentFilter").val(contentarr.toString());
            $("#SelectedTimeFilter").val(timearr.toString());
            $("#searchForm").trigger("submit");
        }
        if ($("#collectionForm").length > 0) {
            if ($('.collection-focus')[0] !== undefined) {
                localStorage["ScrollPositionX"] = $('.collection-focus').offset().top;
            }
            $("#SelectedContentFilter").val(contentarr.toString());
            $("#SelectedTimeFilter").val(timearr.toString());
            $("#collectionForm").trigger("submit");
        }
    });

    $('ul.dropdown-menu li').on("click", function () {
        $("#SelectedSortType").val($(this).attr("data-value"));

        if ($("#contentTypeForm").length > 0) {
            $("#contentTypeForm").trigger("submit");
        }
        if ($("#newsCentreForm").length > 0) {
            $("#newsCentreForm").trigger("submit");
        }
        if ($("#subTopicForm").length > 0) {
            $("#subTopicForm").trigger("submit");
        }
        if ($("#searchForm").length > 0) {
            $("#searchForm").trigger("submit");
        }
        if ($("#collectionForm").length > 0) {
            $("#collectionForm").trigger("submit");
        }
    });

    if ($(".show-modal-filter").length > 0) {
        showModalFilter()
    }

    if ($(".clear-filter-btn").length > 0) {
        clearModalFilter()
    }

    var urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('PageNo') || urlParams.has('SelectedSortType') || urlParams.has('SelectedContentFilter') || urlParams.has('SelectedTopicFilter') || urlParams.has('SelectedTimeFilter')) {
        let resultsTop = $('.results-top')[0];
        if (resultsTop !== undefined) {
            $('html, body').animate({
                scrollTop: $('.results-top').offset().top
            }, 10);
        }
    }

    $(".menu-item-has-children").click(function () {
        if ($(this).children(".sub-menu").hasClass("sub-menu-show")) {
            $(this).children(".sub-menu").removeClass("sub-menu-show");
            $(this).find(".fa-angle-down").removeClass("rotate-arrow");
        }
        else {
            $(".menu-item-has-children .sub-menu").removeClass("sub-menu-show");
            $(this).children(".sub-menu").addClass("sub-menu-show");
            $(".menu-item-has-children .fa-angle-down").removeClass("rotate-arrow");
            $(this).find(".fa-angle-down").addClass("rotate-arrow");
        }
    });
    $("#search-icon").click(function () {
        $(".menu-item-has-children .sub-menu").removeClass("sub-menu-show");
        $(".menu-item-has-children .fa-angle-down").removeClass("rotate-arrow");
    })

    $(".mobile-nav-toggle").click(function () {
        $(this).toggleClass("btn-close close-bars");
        $("body").toggleClass("overflow-hidden");
    });

    $(".filters-content").click(function () {
        $("body").addClass("overflow-x-hidden")
    });

   

});

$(document).ready(function () {
    $('h1:first').attr('id', 'skip');
});
