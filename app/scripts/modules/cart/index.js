'use strict';
import $ from 'jquery';
//const WICard = require("exports?WICard!../../../../vendor/wicart/wicart.js");

var local = {
    "basket_is_empty": "Список товаров пуст <br><br>Выберите понравившийся вам товар и добавьте в корзину кнопкой КУПИТЬ",
    "name": "Наименование",
    "price": "Стоимость",
    "all": "Всего",
    "order": "Оформить заказ",
    "basket": "корзина",
    "num": "Количество",
    "send": "Спасибо за покупку!\nМы свяжемся с Вами в ближайшее время",
    "goods": "Товаров",
    "amount": "на сумму"
};

function WICard(obj, plugins) {
    this.local = local;
    this.widjetX = 0;
    this.widjetY = 0;
    this.widjetObj;
    this.widjetPos;
    this.cardID = "";
    this.DATA = {};
    this.IDS = [];
    this.objNAME = obj;
    this.CONFIG = {};
    this.IMG = "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b2wAAAAADmNyb3BSZWN0Qm90dG9tbG9uZwAAAAAAAAAMY3JvcFJlY3RMZWZ0bG9uZwAAAAAAAAANY3JvcFJlY3RSaWdodGxvbmcAAAAAAAAAC2Nyb3BSZWN0VG9wbG9uZwAAAAAAOEJJTQPtAAAAAAAQAEgAAAABAAIASAAAAAEAAjhCSU0EJgAAAAAADgAAAAAAAAAAAAA/gAAAOEJJTQQNAAAAAAAEAAAAHjhCSU0EGQAAAAAABAAAAB44QklNA/MAAAAAAAkAAAAAAAAAAAEAOEJJTScQAAAAAAAKAAEAAAAAAAAAAjhCSU0D9QAAAAAASAAvZmYAAQBsZmYABgAAAAAAAQAvZmYAAQChmZoABgAAAAAAAQAyAAAAAQBaAAAABgAAAAAAAQA1AAAAAQAtAAAABgAAAAAAAThCSU0D+AAAAAAAcAAA/////////////////////////////wPoAAAAAP////////////////////////////8D6AAAAAD/////////////////////////////A+gAAAAA/////////////////////////////wPoAAA4QklNBAAAAAAAAAIAAThCSU0EAgAAAAAABAAAAAA4QklNBDAAAAAAAAIBAThCSU0ELQAAAAAABgABAAAABDhCSU0ECAAAAAAAFQAAAAEAAAJAAAACQAAAAAEAAAEgAAA4QklNBB4AAAAAAAQAAAAAOEJJTQQaAAAAAANFAAAABgAAAAAAAAAAAAAAEgAAABIAAAAIBCEEPQQ4BDwEPgQ6AC0AMgAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAEgAAABIAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAQAAAAAAAG51bGwAAAACAAAABmJvdW5kc09iamMAAAABAAAAAAAAUmN0MQAAAAQAAAAAVG9wIGxvbmcAAAAAAAAAAExlZnRsb25nAAAAAAAAAABCdG9tbG9uZwAAABIAAAAAUmdodGxvbmcAAAASAAAABnNsaWNlc1ZsTHMAAAABT2JqYwAAAAEAAAAAAAVzbGljZQAAABIAAAAHc2xpY2VJRGxvbmcAAAAAAAAAB2dyb3VwSURsb25nAAAAAAAAAAZvcmlnaW5lbnVtAAAADEVTbGljZU9y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cy8xLjEvIiB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE0IChXaW5kb3dzKSIgeG1wOkNyZWF0ZURhdGU9IjIwMTYtMDYtMjhUMTg6MjA6NDgrMDM6MDAiIHhtcDpNb2RpZnlEYXRlPSIyMDE2LTA2LTI4VDE4OjI3OjM3KzAzOjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDE2LTA2LTI4VDE4OjI3OjM3KzAzOjAwIiBkYzpmb3JtYXQ9ImltYWdlL2pwZWciIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MGJhODIxYjctYTFiOC01ODQ3LWEzMjgtZGFiNzEzZTZmNWIxIiB4bXBNTTpEb2N1bWVudElEPSJhZG9iZTpkb2NpZDpwaG90b3Nob3A6ZDgyYjI5ZmEtM2Q0NC0xMWU2LWJjY2EtYWRkYjBjZDA0YjU5IiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6NDBiYTFhNjctYzU1ZS01NTQ2LTlkNjktYzY4OWI5MzI3YjI2Ij4gPHhtcE1NOkhpc3Rvcnk+IDxyZGY6U2VxPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0iY3JlYXRlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDo0MGJhMWE2Ny1jNTVlLTU1NDYtOWQ2OS1jNjg5YjkzMjdiMjYiIHN0RXZ0OndoZW49IjIwMTYtMDYtMjhUMTg6MjA6NDgrMDM6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE0IChXaW5kb3dzKSIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0iY29udmVydGVkIiBzdEV2dDpwYXJhbWV0ZXJzPSJmcm9tIGltYWdlL3BuZyB0byBpbWFnZS9qcGVnIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDowYmE4MjFiNy1hMWI4LTU4NDctYTMyOC1kYWI3MTNlNmY1YjEiIHN0RXZ0OndoZW49IjIwMTYtMDYtMjhUMTg6Mjc6MzcrMDM6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE0IChXaW5kb3dzKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8L3JkZjpTZXE+IDwveG1wTU06SGlzdG9yeT4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPD94cGFja2V0IGVuZD0idyI/Pv/uAA5BZG9iZQBkQAAAAAH/2wCEAAICAgICAgICAgIDAgICAwQDAgIDBAUEBAQEBAUGBQUFBQUFBgYHBwgHBwYJCQoKCQkMDAwMDAwMDAwMDAwMDAwBAwMDBQQFCQYGCQ0KCQoNDw4ODg4PDwwMDAwMDw8MDAwMDAwPDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDP/AABEIABIAEgMBEQACEQEDEQH/3QAEAAP/xAGiAAAABwEBAQEBAAAAAAAAAAAEBQMCBgEABwgJCgsBAAICAwEBAQEBAAAAAAAAAAEAAgMEBQYHCAkKCxAAAgEDAwIEAgYHAwQCBgJzAQIDEQQABSESMUFRBhNhInGBFDKRoQcVsUIjwVLR4TMWYvAkcoLxJUM0U5KismNzwjVEJ5OjszYXVGR0w9LiCCaDCQoYGYSURUaktFbTVSga8uPzxNTk9GV1hZWltcXV5fVmdoaWprbG1ub2N0dXZ3eHl6e3x9fn9zhIWGh4iJiouMjY6PgpOUlZaXmJmam5ydnp+So6SlpqeoqaqrrK2ur6EQACAgECAwUFBAUGBAgDA20BAAIRAwQhEjFBBVETYSIGcYGRMqGx8BTB0eEjQhVSYnLxMyQ0Q4IWklMlomOywgdz0jXiRIMXVJMICQoYGSY2RRonZHRVN/Kjs8MoKdPj84SUpLTE1OT0ZXWFlaW1xdXl9UZWZnaGlqa2xtbm9kdXZ3eHl6e3x9fn9zhIWGh4iJiouMjY6Pg5SVlpeYmZqbnJ2en5KjpKWmp6ipqqusra6vr/2gAMAwEAAhEDEQA/AOGfk/8AlU/5wavrflbS/Mdjo/m6PS5Lzydot+wiXWbuF1L2UU7EKkpi5MgPUjsASPG9BofzkjCMgJVcQf4j3X30/pR7W+1I9ncGPVZcMp4DMRyzjv4MCDWQx5mPFQlXK+poJ55g/IPzL5K/LK48/wDn27h8mapdaklj5W8kakGTU9TjikaK9lSFQWjED8a+oFqA3fiGty9l5MODxcp4TdCJ5y7/AHV5uFoPbvS9p9rDQaCJzwEDLJmh/d4iQJY4mXKXGL+m626XXB81b3L/AP/Q45+RWv8A5aeUfNdz5x/MWHU7648o2q6v5H0ewYxx3us200bW0NxKnxxoD+85Aj7BFakA+PdmZcGHJ4mazwi4gdZDlf3v6Q+3Gg7W7Q0Y0fZ5hEZ5cGaUtzDDIHjlGJ2kf4a3+odLI6b+c/56eU/+cg/JMfmPzxZT+X/zu8q3KWOitpaSPpOraNcXEsxilSRz9XktPUajipeoryr+6zO0O08faGLjyDhzR2FfTKN/YR9v3c17HexGs9kO0Dp9FIZezswMp8ZAy4s0YiNggeuOSh6eUfKvX5GzQvrD/9Hxhnhj+qjsVdir/9k=";


    this.init = function (widjetID, config) {
        this.CONFIG = config || {};
        try {
            this.DATA = JSON.parse(localStorage.getItem(widjetID));
            if ($.isEmptyObject(this.DATA)) {
                this.DATA = {};
            }
        }
        catch (e) {
            this.DATA = {};
        }
        try {
            this.IDS = JSON.parse(localStorage.getItem(widjetID + "_ids"));
            if ($.isEmptyObject(this.IDS)) {
                this.IDS = [];
            }
        }
        catch (e) {
            this.IDS = [];
        }

        this.cardID = widjetID;

        this.widjetObj = $("#" + widjetID);


        if ($.isEmptyObject(this.DATA)) {
            $('#cartContainer').html('<h1>' + this.local.basket_is_empty + '</h1>');
            //this.widjetObj.html(this.local.basket_is_empty);
        }
        else {
            this.reCalc();
            this.renderBasketTable();
        }

    }

    /***********************************************************************************************
     * example: onclick="cart.addToCart(this, '2', 'Name of comic 2', '25500')
     **********************************************************************************************/
    this.addToCart = function (curObj, id, params) {
        var kol = 1;
        if ($("input").is("#" + wiNumInputPrefID + id)) {
            kol = parseInt($("#" + wiNumInputPrefID + id).val());
        }

        id = ( $.isNumeric(id) ) ? "ID" + id.toString() : id;

        var id_ = ( $.isEmptyObject(params.subid) ) ? id : id + "_" + params.subid;


        var goodieLine = {
            "id": id_,
            "name": params.name,
            "price": params.price,
            "num": kol,
            "url": (params.link) ? params.link : document.location.href,
            "photo": ""
        };

        if ($.isEmptyObject(this.DATA)) {
            this.DATA[id_] = goodieLine;
            this.IDS.push(id_);
        }
        else
            for (var idkey in this.DATA) {


                if ($.inArray(id_, this.IDS) === -1) {
                    this.DATA[id_] = goodieLine;
                    this.IDS.push(id_)

                }
                else if (idkey == id_) {

                    this.DATA[idkey].num += kol;

                }
            }

        //console.log(JSON.stringify(this.DATA));
        localStorage.setItem(this.cardID, JSON.stringify(this.DATA));
        localStorage.setItem(this.cardID + "_ids", JSON.stringify(this.IDS));
        this.reCalc();

        this.renderBasketTable();

        if (this.CONFIG.showAfterAdd) {
            cart.showWinow('bcontainer', 1);
        }
    }
    this.reCalc = function () {
        var num = 0;
        var sum = 0;
        for (var idkey in this.DATA) {
            num += parseInt(this.DATA[idkey].num).toFixed(0);
            sum += parseFloat(parseInt(this.DATA[idkey].num) * parseFloat(this.DATA[idkey].price));
        }

        // *** currency plugin *** //

        if (typeof WICartConvert == 'function') {
            sum = WICartConvert(sum);
        }

        // *** //
        this.widjetObj.html(this.local.goods + " " + num + " " + this.local.amount + " " + sum + " Р.");
        localStorage.setItem(this.cardID, JSON.stringify(this.DATA));
    }
    this.clearBasket = function () {
        this.DATA = {};
        this.IDS = [];
        //this.widjetObj.html(this.local.basket_is_empty);
        $('#cartContainer').html('<h1>' + this.local.basket_is_empty + '</h1>');
        localStorage.setItem(this.cardID, "{}");
        localStorage.setItem(this.cardID + "_ids", "[]");
        $("#btable").html('');
        $("#bcontainer").remove();
        $("#blindLayer").remove();
    }
    this.renderBasketTable = function () {
        var bconTainer = document.getElementById('bcontainer')
        if (!bconTainer) {
            var loc = (document.location.href.indexOf('order') > 0) ? '/shop/cart/?action=order' : '/shop/cart/?action=show';
            var link = (document.location.href.indexOf('show') > 0) ? "/shop/cart/?action=order" : "/shop/cart/?action=show";
            //console.log(document.location.href.indexOf('cart-list.php'));
            console.log(loc);
            $('#cartContainer').empty();
            if (loc != '/shop/cart/?action=order') {
                $("#cartContainer").append("<div id='bcontainer' class='bcontainer'>" +
                    "<table id='bcaption' class='tbl-bin'>" +
                    "<tr id='heading'>" +
                    "<td><span>" + this.local.name + "</span></td>" +
                    "<td><span>" + this.local.price + "</span></td>" +
                    "<td><span class='num-sep'>" + this.local.num + "</span></td>" +
                    "<td><span  class='sum-sep'>" + this.local.all + "</span></td>" +
                    "<td><span>Удалить</span></td></tr>" +
                    "<tr class='brd-top'>" +
                    "<td> </td>" +
                    "<td class='aright micro' colspan='3'>Итого:</td>" +
                    "<td class='upper bold'><span id='bsum'>...</span></td></tr>" +
                    "</table> " +
                    "<div class='mrt-0x upper bold aright'><a href='" + link + "'class='btn bg-ff clr-02'>Оформить заказ</a></div>" +
                    "</div>");
            } else if (loc == '/shop/cart/?action=order') {
                $("#cartContainer").append("<div id='bcontainer' class='bcontainer'>" +
                    "<table border='1' cellpadding='5' id='bcaption' class='tbl-bin'>" +
                    "<tr id='heading'>" +
                    "<th><span>" + this.local.name + "</span></th>" +
                    "<th><span>" + this.local.price + "</span></th>" +
                    "<th><span>" + this.local.num + "</span></th>" +
                    "<th><span>" + this.local.all + "</span></th>" +
                    "<tr class='brd-top'>" +
                    "<td> </td>" +
                    "<td class='aright micro' colspan='2'>Итого:</td>" +
                    "<td class='upper bold'><span id='bsum'>...</span></td></tr>" +
                    "</table> " +
                    "</div>");
            }
        }
        else {
            $(".bitem").remove();
        }
        //this.center( $("#bcontainer") )

        for (var idkey in this.DATA) {
            var proline = this.DATA[idkey]

            var productLine;

            var productLine;
            if (loc != '/shop/cart/?action=order') {
                productLine = '<tr class="bitem bold upper" id="wigoodline-' + proline.id + '">' +
                    '<td><a href="' + proline.url + '">' + proline.photo + proline.name + '</a></td>' +
                    '<td id="lineprice_' + proline.id + '"class="wigoodprice">' + proline.price + ' Р.</td>' +
                    '<td class="klvo"><div class="basket_num_buttons" id="minus_' + proline.id + '">-</div>' +
                    '<span class="basket_num" id="basket_num_' + proline.id + '">' + proline.num + '</span>' +
                    '<div class="basket_num_buttons" id="plus_' + proline.id + '">+</div></td>' +
                    '<td id="linesum_' + proline.id + '">' + parseFloat(proline.price * proline.num)+ ' Р.</td>' +
                    '<td><a class="del_basket_row" href="#" onclick="' + this.objNAME + '.delItem(\'' + proline.id + '\',\'' + proline.name + '\')"></a></td>' +
                    '</tr>';
            } else if (loc == '/shop/cart/?action=order') {
                productLine = '<tr class="bitem bold upper" id="wigoodline-' + proline.id + '">' +
                    '<td>' + proline.name + '</td>' +
                    '<td id="lineprice_' + proline.id + '"class="wigoodprice">' + proline.price + ' Р.</td>' +
                    '<td class="klvo">' + proline.num + '</td>' +
                    '<td id="linesum_' + proline.id + '">' + parseFloat(proline.price * proline.num) + ' Р.</td>' +
                    '</tr>';
            }


            $("#heading").after(productLine);

            $(".basket_num_buttons").data("min-value");
        }


        //* кнопки +/-
        var self = this;
        for (var ids in this.IDS) {
            $('#minus_' + this.IDS[ids]).bind("click", function () {
                var cartItemID = $(this).attr("id").substr(6);
                var cartNum = parseInt($("#basket_num_" + cartItemID).text());
                var cartNum = (cartNum > 1) ? cartNum - 1 : 1;
                self.DATA[cartItemID].num = cartNum;

                $("#basket_num_" + cartItemID).html(cartNum);
                var price = parseFloat($("#lineprice_" + cartItemID).html());
                $("#linesum_" + cartItemID).html(parseFloat(price * cartNum) + ' Р.');

                self.sumAll();

                self.reCalc();

            });

            $('#plus_' + this.IDS[ids]).bind("click", function () {
                var cartItemID = $(this).attr("id").substr(5);
                var cartNum = parseInt($("#basket_num_" + cartItemID).text());
                var cartNum = (cartNum < 1000000) ? cartNum + 1 : 1000000;
                self.DATA[cartItemID].num = cartNum;
                $("#basket_num_" + cartItemID).html(cartNum);
                var price = parseFloat($("#lineprice_" + cartItemID).html());
                $("#linesum_" + cartItemID).html(parseFloat(price * cartNum) + ' Р.');

                self.sumAll();
                self.reCalc();

            });

        }
        this.sumAll();

    }
    this.sumAll = function () {
        var sum = 0;
        for (var idkey in this.DATA) {
            sum += parseFloat(this.DATA[idkey].price * this.DATA[idkey].num);
        }
        $("#bsum").html(sum + " Р.");
    }
    // this.center = function(obj)
    // 	{
    //
    // 	obj.css({"top" : "200px"});
    // 	obj.css({"left" : Math.max(0, (($(window).width() - $(obj).outerWidth()) / 2) + $(window).scrollLeft()) + "px"});
    // 	return obj;
    // 	}
    // this.showWinow = function(win, blind)
    // 	{
    // 	$("#" + win).show();
    // 	if (blind)
    // 	$("#blindLayer").show();
    // 	}
    // this.closeWindow = function(win, blind)
    // 	{
    // 	$("#" + win).hide();
    // 	if (blind)
    // 	$("#blindLayer").hide();
    // 	}
    this.delItem = function (id, name) {
        if (confirm("Удалить " + name + "?")) {
            $(".bitem").remove();
            delete this.DATA[id];
            this.IDS.splice($.inArray(id, this.IDS), 1);
            this.reCalc();
            this.renderBasketTable();
            localStorage.setItem(this.cardID, JSON.stringify(this.DATA));
            localStorage.setItem(this.cardID + "_ids", JSON.stringify(this.IDS));
            if (this.IDS.length == 0)
            //this.widjetObj.html(this.local.basket_is_empty);
                $('#cartContainer').html('<h1>' + this.local.basket_is_empty + '</h1>');
        }
    }
    this.sendOrder = function (domElm, formId) {
        var formData = '';
        if (formId){
            $('#'+formId+' input').each(function(e){
                formData += $(this).attr('id')+':'+$(this).val()+"\n";
            });
            $('#'+formId+' textarea').each(function(e){
                var s = $(this).val();
                s = s.replace(/\n/g, '\\n');
                formData += $(this).attr('id')+':'+s+"\n";
            });
        }

        if (this.CONFIG.validate) {
            var valid = this.CONFIG.validate.validationEngine('validate', {promptPosition: "inline", scroll: false});
            if (!valid) return false;
            $('.formError').remove();
        }
        var bodyHTML = "";
        var arr = domElm.split(",");

        for (var f = 0; f < arr.length; f++) {
            var htmlPart = this.getForm(arr[f])
            if (htmlPart) {
                bodyHTML += htmlPart + "<br>";
            } else {
                bodyHTML = null;
                break;
            }
        }
        ;
        $('.basket_num_buttons').remove();
        if (bodyHTML) {
            console.log(bodyHTML);
            $.post("/forms/sendmail.php", {"order": bodyHTML, "formData": formData}).done(function (data) {
                //cart.closeWindow("bcontainer", 1)
                //cart.closeWindow("order", 0);
                if (data == 'OK') {
                    if (cart.CONFIG.clearAfterSend) {
                        cart.clearBasket();
                    }
                    document.location.href = location.origin + '/shop/cart/?action=order-send&order=ok';
                } else {
                    alert(data);
                }


            });
        } else {
            alert("Необходимо сначала добавть товары в корзину,\n а потом оформлять заказ!!!");
            document.location.href = location.origin;
        }

    };
    this.getForm = function (formId) {
        var formObj = document.getElementById(formId);

        if (!formObj) {
            return false;
        } else {
            var copyForm = formObj.cloneNode(true);
            INPUTS = [].slice.call(copyForm.querySelectorAll("input,select,textarea"));

            INPUTS.forEach(function (elm) {
                if ((elm.tagName == 'INPUT') && (elm.type == 'checkbox')) {
                    var spanReplace = document.createElement("span");
                    spanReplace.innerHTML = (elm.checked) ? elm.value : "";
                    elm.parentNode.replaceChild(spanReplace, elm);
                }
                else if ((elm.tagName == 'INPUT') && (elm.type == 'radio')) {
                    var spanReplace = document.createElement("span");
                    spanReplace.innerHTML = (elm.checked) ? elm.value : "";
                    elm.parentNode.replaceChild(spanReplace, elm);
                }
                else if ((elm.tagName == 'INPUT') && ((elm.type == 'text') || (elm.type == 'hidden'))) {
                    var subjP = document.createElement('b');
                    subjP.innerHTML = elm.placeholder + ': ';
                    elm.parentNode.insertBefore(subjP, elm);
                    var spanReplace = document.createElement("span");
                    spanReplace.innerHTML = elm.value + '<br>';
                    elm.parentNode.replaceChild(spanReplace, elm);
                }
                else if (elm.tagName == 'TEXTAREA') {
                    var subjP = document.createElement('b');
                    subjP.innerHTML = elm.placeholder + ': ';
                    elm.parentNode.insertBefore(subjP, elm);
                    var spanReplace = document.createElement("span");
                    spanReplace.innerHTML = $("#" + elm.id).val() + '<br>';
                    elm.parentNode.replaceChild(spanReplace, elm);
                }
                if (elm.tagName == 'SELECT') {
                    var selVal = $("#" + elm.id + " option:selected").val();
                    $(elm).replaceWith(selVal);
                }

            });


            return copyForm.innerHTML;
        }
    }
}



const WICartNum = require("exports?WICartNum!../../../../vendor/wicart/wicart.num.js");
require('wicart/jquery.validationEngine.js');
require('wicart/jquery.validationEngine-ru.js');
require('wicart/validationEngine.jquery.css');
var cart;
var config;
var wiNumInputPrefID;

var wibutton_id_prefix = "wicartbutton";
var wibasketwidjet_id = "cartwidjet";
var wicartprice_id_prefix = "wicartprice";
$(document).ready(function () {



    // $('input#phone').inputmask('+7 (999) 999-99-99', {
    //     showMaskOnHover: true,
    //     placeholder: '_'
    // });
    /* */

    var contactForm = $('#formToSend');

    cart = new WICard("cart");
    config = {'clearAfterSend':true, 'showAfterAdd':false, 'validate':contactForm};
    cart.init("basketwidjet", config);

    WICartNum('cart', 'wicartnum', 'winum_');
    /* WI-MODULES */

    $('.addToCart').on('click', function() {

        var _id, _params, elem;
        _params = {};
        _id = $(this).data('prod-id');
        elem = document.getElementById('prod-' + _id);
        _params.id = _id;
        _params.subid = {};
        _params.name = $('#prod-' + _id).find('.product__name').text();
        _params.price = $('#prod-' + _id).find('.product__price').text();
        _params.link = $('#prod-' + _id).find('.product__link').attr('href');
        setTimeout(function() {
            console.log(_params)
            cart.addToCart(this, _id, _params);
        }, 10);
    });


    $("body").append("<div style='position: absolute;' id='wibird'></div>");
    var wibird = $("#wibird");
    wibird.offset({ top: -300, left: -300});



    $("[id*='" + wibutton_id_prefix + "']").each(function()
    {
        $( $(this) ).bind( "click", function()
        {
            var buy_button = $(this).attr("id");
            var good_id = buy_button.substr(buy_button.indexOf("_") + 1);

            var pos = $(this).offset();
            wibird.offset({ top: pos.top, left: pos.left});
            var price = $("#" + wicartprice_id_prefix + "_" + good_id).html();
            wibird.html(price);

            var basket_pos = $("#" + wibasketwidjet_id).offset();
            console.log(pos);
            console.log(basket_pos)
            wibird.animate(
                {
                    'left': basket_pos.left-70,
                    'top': basket_pos.top
                }
                ,
                {
                    'duration': 700,
                    complete:  function()
                    {
                        wibird.offset({ top: -300, left: -300});
                    }
                });

        });
    });

});
window.addEventListener('storage', function (event) {
    console.log(event.key, event.newValue);
});
// document.addEventListener('visibilitychange', function (e) {
//     cart.init("basketwidjet", config);
//     console.log('rururur');
// }, false);
