// --------------------- ДА СЕ ИЗТРИЕ ПРИ ПУБЛИКУВАНЕ ------------------
// ------------------------------- DEBUG -------------------------------
// ---------------------------------------------------------------------
// използване: kep('от недрата на nezemnaFunkcia', this, arguments);
// http://j.mp/imprimatur-kep
// IE9 да използва вградената си конзола
if (Function.prototype.bind && console && typeof console.log === "object") {
    ["log","info","warn","error","assert","dir","clear","profile","profileEnd"]
            .forEach(function (method) {
        console[method] = this.call(console[method], console);
    }, Function.prototype.bind);
}

// kep() - cross-browser console.log ловим справки за хербализиране
if (!window.kep) {
    window.kep = function () {
        kep.herbarij = kep.herbarij || [];  // запазваме хванатото в масив за справки
        kep.herbarij.push(arguments);
        // Модерни браузъри
        if (typeof console !== 'undefined' && typeof console.log === 'function') {
            // Opera 11 показва аргументите като цял масив вместо да ги раздели на части, затова ги записваме един по един
            if (window.opera) {
                var i = 0;
                while (i < arguments.length) {
                    console.log("Пункт " + (i + 1) + ": " + arguments[i]);
                    i++;
                }
            }
            // Всички останали модерни браузъри
            else if ((Array.prototype.slice.call(arguments)).length === 1 && typeof Array.prototype.slice.call(arguments)[0] === 'string') {
                console.log((Array.prototype.slice.call(arguments)).toString());
            }
            else {
                console.log(Array.prototype.slice.call(arguments));
            }
        }
        // IE8
        else if (!Function.prototype.bind && typeof console !== 'undefined' && typeof console.log === 'object') {
            Function.prototype.call.call(console.log, console, Array.prototype.slice.call(arguments));
        }
        // lte IE7 и останалите стари браузъри
        else {
            // Инжектираме Firebug lite
            if (!document.getElementById('firebug-lite')) {
                var script = document.createElement('script');
                script.type = "text/javascript";
                script.id = 'firebug-lite';
                // If you run the script locally, point to /path/to/firebug-lite/build/firebug-lite.js
                script.src = 'https://getfirebug.com/firebug-lite.js';
                // Ако искаме конзолният прозорец да се отваря по подразбиране, премахваме коментара на долния ред
                //document.getElementsByTagName('HTML')[0].setAttribute('debug','true');
                document.getElementsByTagName('head')[0].appendChild(script);
                setTimeout(function () {
                    kep(Array.prototype.slice.call(arguments));
                }, 2000);
            }
            else {
                // Firebug lite е вмъкнат, но не е довършил още зареждането си, затова опитваме отново през 1/2 сек
                setTimeout(function () {
                    kep(Array.prototype.slice.call(arguments));
                }, 500);
            }
        }
    };
}
// ------------------------------- КРАЙ DEBUG --------------------------
// ---------------------------------------------------------------------
