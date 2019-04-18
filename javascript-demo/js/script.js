var fridge_off_bg = "url('images/frigider-OFF.png') no-repeat"; 
var fridge_on_bg = "url('images/frigider-ON.png') no-repeat";

var tv_on_bg = "url('images/tv-ON.png') no-repeat";
var tv_off_bg = "url('images/tv-OFF.png') no-repeat";
/*
var fridge_content = localStorage.getItem('fridge_content').split(',') || [];
var sertar_content = localStorage.getItem('sertar_content').split(',') || [];
var umeras_content = localStorage.getItem('umeras_content').split(',') || [];
*/
var fridge_content = [];
var sertar_content = [];
var umeras_content = [];
var frigider_on = false;
var tv_on = false;
var channel_list = /*localStorage.getItem('channel_list').split(',') ||*/ ['TVR1', 'TVR2', 'TVR3'];

var fridge_auto_close = -2;
var tv_sleep_timeout = -2;
var jq_span = -1;

window.onload = function()
{
    console.warn(localStorage);
    console.info(fridge_content);
    addFridgeOpenEvent();
    addTvOpenEvent();
    textarea = document.createElement('textarea');
    textarea.id = "channel_database";
    textarea.value = "TVR1, TVR2, TVR3";
    label = document.createElement('label');
    text = document.createTextNode("Lista canale");
    text.nodeValue = "Lista canale: ";
    label.appendChild(text);
    channel_list = textarea.value.split(',');
    jq_label = $(label)
    jq_textarea = $(textarea);
    localStorage.setItem('channel_db', textarea.value);
    $("#tv-control").prepend(jq_textarea);
    $("#tv-control").prepend(jq_label);

    coords = document.createElement('span');
    jq_span = $(coords);
    jq_span.css('border', '2px dotted grey');
    jq_span.css('height', '1.7rem');
    jq_span.css('width', '2rem');
    jq_span.css('opacity', '0.6');
    jq_span.css('position', 'absolute');
    jq_span.css('visibility', 'hidden');
    $(document.body).append(jq_span);

    button = document.createElement('button');
    button.id = 'save-all';
    button.value = 'save';
    button.innerHTML = 'Save all';
    button.style.position = 'absolute';
    button.style.bottom = '5%';
    button.style.right = '5%';
    button.onclick = function() {
        localStorage.setItem('fridge_content', fridge_content);
        localStorage.setItem('sertar_content', sertar_content);
        localStorage.setItem('umeras_content', umeras_content);
        localStorage.setItem('channel_list', channel_list);
    };
    document.body.appendChild(button);
}
function addFridgeOpenEvent()
{
    $("#open-fridge").click(function()  {
        btn = $("#open-fridge");
        close_btn = document.createElement('button');
        close_btn.id = 'close-fridge';
        close_btn.innerHTML = "Inchide frigider";
        $("#frigider").css("background", fridge_on_bg);
        $("#frigider").css("background-size", "contain");
        btn.replaceWith(close_btn);
        addFridgeCloseEvent();
        fridge_auto_close = setTimeout(function()  {
            $("#close-fridge").trigger('click');
            alert("Frigiderul s-a inchis deoarece l-ati uitat deschis");
        }, 10000);
        frigider_on = true;
    });
}
function addFridgeCloseEvent()
{
        $("#close-fridge").click(function()  {
            btn = $("#close-fridge");
            open_btn = document.createElement('button');
            open_btn.id = 'open-fridge';
            open_btn.innerHTML = "Deschide frigider";
            $("#frigider").css("background", fridge_off_bg);
            $("#frigider").css("background-size", "contain");
            btn.replaceWith(open_btn);
            addFridgeOpenEvent();
            frigider_on = false;
            
        });
}

function addTvOpenEvent()
{
    $("#open-tv").click(function()  {
        btn = $("#open-tv");
        close_btn = document.createElement('button');
        close_btn.id = 'close-tv';
        close_btn.innerHTML = "Inchide televizor";
        $("#tv").css("background", tv_on_bg);
        $("#tv").css("background-size", "contain");
        btn.replaceWith(close_btn);
        addTvCloseEvent();
        tv_sleep_timeout = setTimeout(function()  {
            $("#close-tv").trigger('click');
            alert("Televizorul s-a inchis deoarece nu-l folositi");
        }, 10000);
        tv_on = true;
    });
}
function addTvCloseEvent()
{
        $("#close-tv").click(function()  {
            btn = $("#close-tv");
            open_btn = document.createElement('button');
            open_btn.id = 'open-tv';
            open_btn.innerHTML = "Deschide televizor";
            $("#tv").css("background", tv_off_bg);
            $("#tv").css("background-size", "contain");
            btn.replaceWith(open_btn);
            addTvOpenEvent();
            tv_on = false;
            $("tv").empty();
            clearTimeout(tv_sleep_timeout);
        });
}

document.addEventListener('click', function(e)    {
    e.stopPropagation();
    console.info(e.target.id);
    if (e.target.id == 'frigider')
    {
/* NU TREBUIE SA FIE PORNIT CA E SMART        if (frigider_on)
        {*/
            alert(fridge_content);
            clearTimeout(fridge_auto_close);
        //}
    }
    else if (e.target.id == 'sertar')
    {
        alert(sertar_content);
    }
    else if (e.target.id == 'umeras')
    {
        alert (umeras_content);
    }
});

document.getElementById('alimente_frigider').addEventListener('change', function()  {
    text = this.value;
    fridge_content = text.split(',');
    console.info(fridge_content);
    var select = document.getElementById('select_alimente');
    var options = [];
    for (i = 0; i < fridge_content.length; i++)
    {
        optiune = document.createElement('option');
        optiune.value = fridge_content[i];
        optiune.innerHTML = fridge_content[i];
        options.push(optiune);
        select.appendChild(optiune);
    }
    select.onchange = function()    {
        index = this.selectedIndex;
        this.remove(index);
        delete options[index];
        delete fridge_content[index];

        console.warn(options);
        input_val = [];
        for (i = 0; i <= options.length; i++)
        {
            if (options[i])
            {
                console.warn(options[i].value);
                text = options[i].value;
                input_val.push(text);
            }
        }
        document.getElementById('alimente_frigider').value = input_val.join(',');
    }
});
var t = -1;
function changeTvChannel(index = Math.floor(Math.random() * channel_list.length))
{
    tv = document.getElementById('tv');
    h1 = document.createElement('h1');
    h1.innerHTML = channel_list[index];
    h1.style.color = "white";
    h1.style.textAlign = "left";
    h1.style.fontWeight = "700";
    $("#tv").empty();
    tv.appendChild(h1);
    
}
document.getElementById('set_channel_interval').addEventListener('change', function(e)   {
    elem = $(this);
    range_value = elem.val();
    clearInterval(t);
    clearTimeout(tv_sleep_timeout);
    if ($("#range_value").length < 1)
    {
        
        $("<input type = 'number' id = 'range_value' value = " + range_value + "></input><br/>").insertBefore($("#set_channel_interval"));
    }
    else
    {
        $("#range_value").val(range_value);
        if (tv_on)
            t = setInterval(changeTvChannel, range_value * 1000);
        else
        {
            alert ("Va rugam deschideti televizorul din buton sau apasand tasta 2");
        }
    }

});

document.addEventListener('keypress', function(e)    {
    
        if (e.keyCode == '2'.charCodeAt(0))
        {
                $("#open-tv").trigger('click');
        } 
        else if (e.keyCode == '1'.charCodeAt(0))
        {
                $("#open-fridge").trigger('click');
        }     
});

$("input[type='radio']").click(function(e)  {
    clearInterval(t);
    clearTimeout(tv_sleep_timeout);
    if (tv_on)
        changeTvChannel(this.value);
    else
    {
        $("#open-tv").trigger('click');
        changeTvChannel(this.value);
    }

});
var check_count = 0;

$("input[type='checkbox']").click(function(e)  {
    if (check_count == 0 && (sertar_content || umeras_content))
    {
        sertar_content = [];
        umeras_content = [];
        check_count = check_count + 1;
    }
    elem = $(this);
    part_from = elem.val();
    tip = elem.attr('name');
    if (this.checked)
    {
        newP = document.createElement("p");
        newP.style.color = "white";
        newP.style.fontWeight = "700";
        textNode = document.createTextNode(tip);
        newP.appendChild(textNode);
        document.getElementById(part_from).appendChild(newP);
        if (part_from == 'sertar')
        {
            console.info(sertar_content);
            sertar_content.push(tip);
        }
        else if (part_from == 'umeras')
        {
            umeras_content.push(tip);
        }
    }
    else
    {
        allChild = $("#"+part_from + " > p");
        for (i =0; i < allChild.length; i++)
        {
            if (allChild[i].innerHTML == tip)
            {
                allChild[i].remove();
                delete allChild[i];
                if (part_from == 'sertar')
                {
                    for (j=0;j<sertar_content.length;j++)
                    {
                        if (sertar_content[j] == tip)
                        {
                            sertar_content[j].remove();
                            delete sertar_content[j];
                        }
                    }
                }
                else if (part_from == 'umeras')
                {
                    for (j=0;j<umeras_content.length;j++)
                    {
                        if (umeras_content[j] == tip)
                        {
                            umeras_content[j].remove();
                            delete umeras_content[j];
                        }
                    }
                }
            }
        }
    }
});

document.addEventListener('mousemove', function(e)   {
    jq_span.css('visibility', 'visible');
    jq_span.css('top', e.clientY + 10);
    jq_span.css('left', e.clientX + 10);
    jq_span.css('color', 'black');
    jq_span.css('font-size', '0.5rem');
    jq_span.css('font-weight', '600');
    jq_span.html("X: " + e.clientX + " Y:" + e.clientY);
});

autosave = setInterval(function()   {
    $("#save-all").trigger('click');
    alert('S-a efectuat autosave-ul');
}, 60000);