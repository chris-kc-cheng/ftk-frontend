db = [{'_id': 'MongoDB', 'children': []},
 {'_id': 'dbm', 'children': []},
 {'_id': 'Databases', 'children': ['MongoDB', 'dbm']},
 {'_id': 'Languages', 'children': []},
 {'_id': 'Programming', 'children': ['Databases', 'Languages']},
 {'_id': 'Books', 'children': ['Programming']}];

const tree = (x) => {
    const item = db.filter(y => y._id == x)[0]
    const obj = { _id: item._id }
    obj.children = item.children.map(tree)
    return obj
}

console.log(tree("Books"));