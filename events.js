var items = {
    "registration": { name: "registration", start: "8:00am", location: "UBC Robson Square" },
    "opening remarks": { name: "opening remarks", start: "8:45am", location: "Theatre Room C300" },
    "lunch": { name: "lunch", start: "12:15pm", location: "UBC Robson Square" },
    "closing remarks": { name: "closing remarks", start: "4:30pm", location: "Theatre Room C300" },
    "after party": { name: "after party", start: "5:30pm", location: "Steamworks Brew Pub in Gastown" }
};

var synonyms = {
    "registration": "registration",
    "opening remarks": "opening remarks",
    "keynote": "opening remarks",
    "lunch": "lunch",
    "closing remarks": "closing remarks",
    "closing": "closing remarks",
    "after party": "after party",
    "dinner": "after party"
};

module.exports = { items, synonyms };