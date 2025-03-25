const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;
const LISTS = require('./list.json')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json()) 
app.set('view engine','ejs')
app.set('views', path.join(__dirname, 'views'));

app.get('/' , (req, res) => {

    const { lists } = LISTS;
    const data =  {
        title: "Collections",
        list: lists.map(item => {
            return {
                title: item.title,
                url: `/${item.path}`,
            }
        }),
        show_desc: false
    }
    res.render('index', data)
})

app.get('/:path', (req, res) => {

    const path = req.params.path;
    const { lists } = LISTS;

    const is_path_exist = lists.find(e => e.path === path);

    if(!is_path_exist) {
        return res.render('404');
    }

    const data = {
        ...is_path_exist,
        show_desc: true
    }

    return res.render('index', data)
})

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
})