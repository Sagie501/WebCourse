var test_group_list;

function assert (value, name) {
    var listMember = document.createElement("li");
    listMember.classList.add(value ? "passed" : "failed");
    var assertName = document.createTextNode(name);
    listMember.appendChild(assertName);
    test_group_list.appendChild(listMember);
    if(!value){
        listMember.parentNode.parentNode.classList.remove("passed");
        listMember.parentNode.parentNode.classList.add("failed");
    }
}

function test_group (name, test_group_function) {
    var test_group_div = document.createElement("div");
    test_group_div.classList.add("testGroup");
    test_group_div.classList.add("passed");
    var test_group_name = document.createTextNode(name);
    test_group_list = document.createElement("ul");
    test_group_div.appendChild(test_group_name);
    test_group_div.appendChild(test_group_list);
    test_group_function();
    document.body.innerHTML += test_group_div.outerHTML;
}