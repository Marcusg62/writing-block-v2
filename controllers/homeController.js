var courses = [
    {
        title: "Rasberry Cake",
        cost: 50
    },
    {
        title: "Soup",
        cost: 50
    },
    {
        title: "Chips",
        cost: 50
    },
    {
        title: "Bread",
        cost: 50
    },
    {
        title: "Donuts",
        cost: 50
    },
]
module.exports = {
    index: (req, res) => {
        res.render('index')
    }
}
