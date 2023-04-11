const util = require("hexo-util");
const marked = require("marked");

hexo.extend.tag.register(
    "bubble",
    function (args, content) {
        var charaName = args[0];
        var parsedBubble = content
            .replace(/<thought>/g, `<span class="thought">`)
            .replace(/<\/thought\>/g, `</span>`)
            .replace(/<th>/g, `<span class="thought">`) // <thought> shorthand
            .replace(/<\/th\>/g, `</span>`)
            .replace(/<spell>/g, `<span class="spell">`)
            .replace(/<\/spell>/g, `</span>`)
            .replace(/<sp>/g, `<span class="spell">`) // <spell> shorthand
            .replace(/<\/sp\>/g, `</span>`)
            .replace(/<hold>/g, `<span class="hold">`)
            .replace(/<\/hold\>/g, `</span>`)
            .replace(/<ho>/g, `<span class="hold">`) // <hold> shorthand
            .replace(/<\/ho\>/g, `</span>`)
            .replace(/<nf>/g, `<span class="noFuck">`) // NoFuck
            .replace(/<\/nf\>/g, `</span>`)
            .replace(/<yf>/g, `<span class="yesFuck" style="display:none">`) // yesFuck
            .replace(/<\/yf\>/g, `</span>`);

        parsedBubble = marked(parsedBubble);

        if (args[1] === undefined) {
            return `<div class=msr-unit character="${charaName}"><div class=msr-icon><div class=msr-icon__wrapper><div class=msr-icon__base></div></div></div><div class=msr-name></div><div class=msr-line>${parsedBubble}</div></div>`;
        } else {
            return `<div class=msr-unit character="${charaName}" ${args[1]}><div class=msr-icon><div class=msr-icon__wrapper><div class=msr-icon__base></div></div></div><div class=msr-name></div><div class=msr-line>${parsedBubble}</div></div>`;
        }
    },
    { ends: true }
);

hexo.extend.tag.register("season", function (args) {
    var seasonName = args[0];
    switch (seasonName) {
        case "Winter":
            return `<div class="msr-season winter"><p><span><b>Season:</b> Winter</span></p></div>`;
            break;
        case "Spring":
            return `<div class="msr-season spring"><p><span><b>Season:</b> Spring</span></p></div>`;
            break;
        case "Summer":
            return `<div class="msr-season summer"><p><span><b>Season:</b> Summer</span></p></div>`;
            break;
        case "Fall":
            return `<div class="msr-season fall"><p><span><b>Season:</b> Fall</span></p></div>`;
            break;
        case "Autumn":
            return `<div class="msr-season autumn"><p><span><b>Season:</b> Autumn</span></p></div>`;
            break;
        default:
            break;
    }
});

hexo.extend.tag.register(
    "location",
    function (args, content) {
        var parsedLocation = content;
        parsedLocation = marked(parsedLocation);
        return `<div class="msr-location"><p><span><b>Location:</b> ${parsedLocation
            .replace(/<p>/g, "")
            .replace(/<\/p\>/g, "")}</span></p></div>`;
    },
    { ends: true }
);

hexo.extend.tag.register(
    "narration",
    function (args, content) {
        var parsedNarration = content;
        parsedNarration = marked(parsedNarration);

        return `<div class="msr-narration">${parsedNarration}</div>`;
    },
    { ends: true }
);

hexo.extend.tag.register(
    "cw",
    function (args, content) {
        var parsedWarning = content;
        parsedWarning = marked(parsedWarning);

        return `<div class="msr-cw"><span class="cw-header">Content Warning</span>${parsedWarning}</div>`;
    },
    { ends: true }
);

var renderFootnotes = require("./src/footnotes");

hexo.extend.filter.register("before_post_render", function (data) {
    data.content = renderFootnotes(data.content);
    return data;
});
