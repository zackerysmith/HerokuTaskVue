
DB = [
    {

        "order": 1,
        "editMe": false,
        "NotComplete": true,
        "title": "Vue First Title",
        "content": "Vue Content Data",
        "duedate": "",
        "tags": [
            "Fixed",
            "Criticle"
        ]
    },
    {
        "order": 2,
        "editMe": false,
        "NotComplete": true,
        "title": "Vue Second Title",
        "content": "Vue Content Data",
        "duedate": "",
        "tags": [
            "Criticle"
        ]
    },
    {

        "order": 3,
        "editMe": false,
        "NotComplete": true,
        "title": "Vue Third Title",
        "content": "Vue Content Data",
        "duedate": "",
        "tags": [
            "Fixed"
        ]
    }
];

// GENERAL FUCNTIONS
function uniqueChars(strArray) {
    //copied from StackOverflow
    let unique = strArray.filter(function (item, i, array) {
        return array.indexOf(item) === i;
    });
    return unique;
}

// Dates are expected in the form YYYY-MM-DD
function strDateDifference(strLatest, strNew) {
    // console.log(strLatest);
    // console.log(strNew);
    // // console.log(strNew.split('-'));
    let OldArray = strLatest.split('-');
    let NewArray = strNew.split('-');
    let old_date = new Date(OldArray[0], OldArray[1], OldArray[2]);
    let new_date = new Date(NewArray[0], NewArray[1], NewArray[2]);
    return ((new_date - old_date) / (24 * 60 * 60 * 1000));
}


// var JsonData = JSON.parse('./data.json');
BlankDB = [];
// Import UI
Vue.component('import-popup', {
    data: function () {
        return {
            display: false,
            DbImportFile: "default data ",
            this: ''
        }
    },
    methods: {
        loadTextFromFile: function(ev) {
            var js = null;
            this.file = ev.target.files[0];
            const reader = new FileReader();

            /// this is the new code
            reader.addEventListener("load",function(){

                this.DbImportFile = JSON.parse(reader.result);
                console.log("Import Completed in Callback");
                console.log(this.DbImportFile);
            }.bind(this),false);
            reader.readAsText(this.file);
            /// this is the old code

            // reader.onload = function (e) {
            //     this.DbImportFile = JSON.parse(e.target.result);
            //     console.log("Import Completed in Callback");
            //     console.log(this.DbImportFile);
            // }
            // reader.readAsText(this.file);

            setTimeout(console.log("Import Completed"),10000);
    },
    ImportDB: function(){
        console.log(this.DbImportFile);
        this.$emit('update-db',this.DbImportFile);
    },
    NoEmptyFile: function(){
        return this.FileSelected;
    }
    },
    props: ['showme'],
    template: `<div class="section modal-mask">
    <article class="container message" style="margin: 100px;background: dimgray;border-radius: 30px">
    <div class="message-header has-background-info">
      <p class="title">Import Data</p><button class="icon is-pulled-right fas fa-database is-large" aria-label="delete" @click="$emit('close-me')"></button>
    </div>
    <div class="message-body has-background-white-ter">
      Please select the csv import file
      </br>
      </br>
      <input type="file" @change="loadTextFromFile">
      <button style="margin-left: 10px" class=" button is-success is-small is-pulled-right"  @click="ImportDB" ><span class="icon is-small"> <i class="fas fa-check"></i></span><span>Import</span></button>           
      <button class=" button is-danger is-small is-pulled-right" @click="$emit('close-import')"><span class="icon is-small"> <i class="fas fa-times"></i></span><span>No</span></button>
    </div>
    </article>
    </div>`
});





// Alert Popup

Vue.component('reset-alert', {
    data: function () {
        return {
            display: false
        }
    },
    props: ['showme'],
    template: `<div class="section modal-mask">
    <article class="container message" style="margin: 100px;background: dimgray;border-radius: 30px">
    <div class="message-header has-background-danger">
      <p class="title">Reset & Clean</p><button class="icon is-pulled-right fas fa-exclamation-triangle is-medium" aria-label="delete" @click="$emit('close-me')"></button>
    </div>
    <div class="message-body has-background-white-ter">
      Are you Sure You want to reset the Todo List ?
      <button style="margin-left: 10px" class=" button is-success is-small is-pulled-right" @click="$emit('reset-me')" ><span class="icon is-small"> <i class="fas fa-check"></i></span><span>Yes</span></button>           
      <button class=" button is-danger is-small is-pulled-right" @click="$emit('close-me')"><span class="icon is-small"> <i class="fas fa-times"></i></span><span>No</span></button>
    </div>
    </article>
    </div>`
});


// TODO Item Add UI comes under AppHeader section

Vue.component('popup', {
    props: ['pophead', 'popcontent', 'popfooter'],
    data: function () {
        return {
            TITLE: "",
            CONTENT: "",
            TAGS: "",
            DUEDATE: (new Date(Date.now())).toISOString().split('T')[0]
        }
    },
    computed: {
        FieldsPopulated: function () {
            if (
                this.TITLE.trim().length > 0
                && this.CONTENT.trim().length > 0
                && this.TAGS.length > 0
                && strDateDifference('2018-01-01', this.DUEDATE) > 1
            ) {
                // // console.log(strDateDifference('2018-01-01', this.DUEDATE));
                return false;
            }
            return true;
        }

    },
    methods: {
        SaveReminder: function () {
            this.$emit('save', {
                "NotComplete": true,
                "editMe": false,
                "title": this.TITLE,
                "content": this.CONTENT,
                "duedate": this.DUEDATE,
                "tags": this.TAGS.toUpperCase().split(',')
            });
        }
    },
    template: `<transition name="modal">
    <div class="modal-mask is-warning">
        <div class="section container card" style="margin: 100px;background: dimgray;border-radius: 30px">
            <div >
                <div>
                    <h1 name="header" class="title is-2"> Reminder Item </h1>

                    <h2 name="header" class="title"> Title* </h2>

                    <input name="remindertitle" class="input is-medium" v-model="TITLE" type="text"></input>
                </div>
                <div>
                    </@
                    <h3 name="body" class="title is-3">
                        Content*
                    </h3>
                    <textarea name="reminderbody" class="textarea" v-model="CONTENT"></textarea>
                </div>
                <div class="title is-5 ">
                    </br>
                    <h4 name="footer">
                        Tags*
                    </h4>
                    <input name="reminderbody" class="input is-large" type="text" v-model="TAGS"></input>
                    </br>
                    </br>
                    <h4 name="due"> Due Date* </h4>
                    <input name="due-date-input" class="input is-medium calender-size-caps" type="date" v-model="DUEDATE"></input>
                </br>
                </div>
                </br>
                </br>
                <button class="button is-primary is-right is-medium" :disabled="FieldsPopulated"  @click="SaveReminder" style="border-radius: 100px"> Save </button> &nbsp
                <button class="button is-danger is-right is-medium" @click="$emit('close')" style="border-radius: 100px"> Close </button>
            </div>
        </div>
    </div>
</transition>`
});

// TODO Item EDIT UI comes under Each Todo section


Vue.component('edit-ui', {
    props: ['taskitem', 'tagvalue', 'duedateval'],
    data: function () {
        return {
            TAGS: this.tagvalue,
            DUEDATE: this.duedateval
        }
    },
    computed: {
        FieldsPopulated: function () {
            if (
                this.taskitem.title.trim().length > 0
                && this.taskitem.content.trim().length > 0
                && this.TAGS.length > 0
                && strDateDifference('2018-01-01', this.DUEDATE) > 1
            ) {
                return false;
            }
            return true;
        }

    },
    methods: {
        EditReminder: function (taskitem) {
            // // console.log(this.TAGS);
            let updatedItem = {
                order: taskitem.order,
                editMe: false,
                NotComplete: taskitem.NotComplete,
                title: taskitem.title,
                content: taskitem.content,
                duedate: this.DUEDATE,
                tags: this.TAGS.toUpperCase().split(',')
            };
            // // console.log(updatedItem);
            this.$emit('edit-todo-item', updatedItem);
        }
    },
    // created: function(){
    //     TAGS = this.tagvalue;
    // }
    // ,
    template: `<transition name="modal">
    <div class="modal-mask is-warning" >
        <div class="section container card" style="margin: 100px;background: dimgray;border-radius: 30px">
            <div>
                <div >
                    <h1 name="header" class="title is-2"> Reminder Item </h1>
                    <h2 name="header" class="title"> Title* </h2>
                    <input name="remindertitle" class="input is-medium" v-model="taskitem.title" type="text"></input>
                </div>
                <div>
                </br>
                    <h3 name="body" class="title is-3">
                    Content*
                    </h3>
                    <textarea name="reminderbody" class="textarea is-medium" v-model="taskitem.content"></textarea>
                </div>
                <div class="title is-5 ">
                </br>
                <h4 name="footer">
                    Tags*
                </h4>
                <input name="reminderbody" class="input is-large" type="text" v-model="TAGS"></input>
                </br>
                </br>
                <h4 name="due"> Due Date </h4>
                <input name="due-date-input" class="input is-medium calender-size-caps" type="date" v-model="DUEDATE"></input>
            </br>
            </div>
            </br>
            </br>
                <button class="button is-primary is-right is-medium" :disabled="FieldsPopulated" @click="EditReminder(taskitem)" style="border-radius: 100px"> EDIT </button> &nbsp
                <button class="button is-danger is-right is-medium" @click="$emit('close-edit',taskitem)" style="border-radius: 100px"> Close </button>
                </div>
                </div>
            </div>
    </transition>`
});


// HEADER SECTION OF THE PAGE

var head = new Vue({
    el: '#AppHeader',
    created: function () {
        // this.PopuUpContent ;
    },
    data: {
        showModal: false,
        popheadValue: "Header Text",
        popcontentValue: "The Body Goes Here",
        popfooterValue: "The Default Footer",
        ToggleButton: true,
        OpenPopup: false,
        SearchTerm: "",
        OpenImport: false
    },
    methods: {

        AddReminder: function (reminder) {

        ///// use LokiAddToCollection(Itemobj)
            var obj = {
                order: todo.find().length + 1,
                editMe: todo.editMe,
                NotComplete: true,
                title: reminder.title,
                content: reminder.content,
                duedate: reminder.duedate,
                tags: uniqueChars(reminder.tags)
            };
            db.loadDatabase({});
            if (!db.getCollection("reminders")) {
                todo = db.addCollection('reminders', { indices: ['order'] });
            }
            else {
                todo = db.getCollection("reminders");
            }
            todo.insert(obj);
            db.saveDatabase();
            this.showModal = false;
            app.TodoItems = todo.chain().find({ 'NotComplete': true }).simplesort('duedate').data();
            this.ToggleButton = true;
            app.showItems = true;
            return;
        },
        toggleShow: function () {
            // // console.log("Toggle Show");
            this.ToggleButton = !this.ToggleButton;
            app.showItems = !app.showItems;
            app.TodoItems = todo.chain().find({ 'NotComplete': app.showItems }).simplesort('duedate').data();;
        },
        ResetMe: function () {
            // // console.log("ResetMe");
            db.loadDatabase({});
            if (!db.getCollection("reminders")) {
                todo = db.addCollection('reminders', { indices: ['order'] });
            }
            else {
                todo = db.getCollection("reminders");
            }
            todo.clear({ removeIndices: true });
            db.saveDatabase();
            app.TodoItems = todo.chain().find({ 'NotComplete': app.showItems }).simplesort('duedate').data();
            this.OpenPopup = false;
        },
        ClearSearch: function(){
            this.SearchTerm='';
            app.TodoItems = todo.chain().find({ 'NotComplete': app.showItems }).simplesort('duedate').data();
        },
        SearchTodo: function () {
        
        /// use the LokiGetCollection here

            let strTerm = this.SearchTerm.toUpperCase(); // // console.log(strTerm);
            let flag = app.showItems;
            db.loadDatabase({});
            if (!db.getCollection("reminders")) {
                todo = db.addCollection('reminders', { indices: ['order'] });
            }
            else {
                todo = db.getCollection("reminders");
            }
            app.TodoItems = todo.chain().where(function (o) {
                // // console.log(strTerm);
                // // console.log((o.NotComplete == app.showItems) & ((o.tags.indexOf(strTerm) > -1) || (o.title.toUpperCase().indexOf(strTerm) > -1)));
                // // // console.log(o.title.toUpperCase().indexOf(strTerm)>-1);
                return (o.NotComplete == flag) && ((o.tags.indexOf(strTerm) > -1) || (o.title.toUpperCase().indexOf(strTerm) > -1));
            }).simplesort('duedate').data();

        },
        GenReport: function () {
            // // console.log("Generate Report");

            // var blob = new Blob(["Hello, world!"], { type: "text/plain;charset=utf-8" });
            // saveAs(blob, "hello world.txt");
            let writeToFile = "";
            app.TodoItems.forEach(function (element,index) {
                if (writeToFile === "" && app.showItems) { writeToFile = "==================================<NOT COMPLETED TASKS>=================================="; }
                else if (writeToFile === "" && !app.showItems) { writeToFile = "=====================================<COMPLETED TASKS>===================================="; }
                writeToFile = writeToFile +
                    `\r\n Item No: ${index+1}`  +
                    `\r\n order: ${element.order}` +
                    `\r\n Due Date: ${element.duedate}` +
                    `\r\n Title: ${element.title}` +
                    `\r\n Conetent: ${element.content}` +
                    `\r\n Tags: ${element.tags}` +
                    `\r\n =========================================================================================`;
            });




            //write and save file
            // var file = new File([writeToFile.replace(/\r\n/gi, '\\u0A')], "hello world__.txt", {type: "text/plain;charset=utf-8"});
            // saveAs(file);


            var blob = new Blob([writeToFile], { type: "ANSI" });
            saveAs(blob, "Generated Report.txt");
        },
        DownloadDB : function(){
            /// /// use the LokiGetCollection here

            db.loadDatabase({});
            if (!db.getCollection("reminders")) {
                todo = db.addCollection('reminders', { indices: ['order'] });
            }
            else {
                todo = db.getCollection("reminders");
            }
            let writeToFile = JSON.stringify(todo.find());
            var blob = new Blob([writeToFile], { type: "ANSI" });
            saveAs(blob, "TaskDatabase.txt");
        },
        UpdateDB : function(newDB){
            console.log(newDB);
            console.log("Import Load Started");
            db.loadDatabase({});
            if (!db.getCollection("reminders")) {
                todo = db.addCollection('reminders', { indices: ['order'] });
            }
            else {
                todo = db.getCollection("reminders");
            }
            newDB.forEach(function(item){
                let obj = {
                    order: todo.find().length + 1,
                    editMe: item.editMe,
                    NotComplete: item.NotComplete,
                    title: item.title,
                    content: item.content,
                    duedate: item.duedate,
                    tags: uniqueChars(item.tags)
                }
                todo.insert(obj);
            });
            setTimeout(alert("DB Import Completed"),5000);
            app.TodoItems = todo.chain().find({ 'NotComplete': true }).simplesort('duedate').data();
            this.OpenImport = false;
        }
    }
});


// TODO Item Component
Vue.component('todo-item', {
    props: ['todo'],
    computed: {
        prioritycss: function () {

            if ( this.todo.NotComplete ){
                if (this.timetillDueDate <= 0) {
                    return {
                            priority: "High",
                            css: {"is-danger": true}
                            };
                }
                else if(this.timetillDueDate > 0 && this.timetillDueDate <= 3) {
                    return {
                        priority: "Medium",
                        css: {"is-warning": true}
                        };
                }
                else if(this.timetillDueDate > 3 && this.timetillDueDate < 7) {
                    return {
                        priority: "Low",
                        css: {"is-success": true}
                        };
                }
                else {
                    return {
                        priority: "Default",
                        css: {"has-background-grey-light": true}
                        };
                }
            }
            else {
                return {
                    priority: "Completed",
                    css: {"is-success": true}
                    };
            }
        },
        timetillDueDate: function(){
            let NowDateObj = new Date(Date.now()); // Today's Date in YYYY-MM-DD format
            let NowDate = NowDateObj.toISOString().split('T')[0];
            return strDateDifference(NowDate, this.todo.duedate);
        }
    },
    template: `<div class="tile is-ancestor">
    <div class="tile is-parent">
    <article class="tile is-child box" >
    <button class="delete is-pulled-right" style="margin-right: -20px; margin-left:10px; margin-top: -18px;" @click="$emit('del-todo',todo)"></button>

    <div class="tags has-addons is-pulled-right" style="margin-top:-5px;">
    <span class="tag has-text-weight-bold ">Status:</span>
    <span class="tag has-text-weight-bold is-warning" v-if="todo.NotComplete">Inprogress</span>
    <span class="tag has-text-weight-bold is-success" v-else>Completed</span>
    </div>

    <div class="tags has-addons is-pulled-right" style="margin-top:-5px; margin-right: 10px">
    <span class="tag has-text-weight-bold ">Priority:</span>
    <span class="tag has-text-weight-bold " :class="prioritycss.css" v-if="todo.NotComplete">{{prioritycss.priority}}</span>
    <span class="tag has-text-weight-bold " :class="prioritycss.css" v-else>{{prioritycss.priority}}</span>
    </div>

    <p class="title is-4 has-text-weight-bold">{{todo.title}} </p> 
    <p>
    <div class="is-pulled-right">
    <span class="subtitle is-6 has-text-weight-bold">Due Date: &nbsp </span>
    <span class="subtitle is-6 has-text-weight-bold">{{todo.duedate}}</span>
    </br>
    <span class="subtitle is-6 ">Days Remaining: &nbsp </span>
    <span class="subtitle is-6 has-text-weight-bold">{{this.timetillDueDate}} Days</span>
    </div>
    <span class="subtitle is-5 multiline">{{todo.content}}</span>
    </p>
    </br>    
    </br>
    <button class="button is-success is-small has-text-dark has-text-weight-bold is-pulled-right custom-hover gap-left-10" @click="$emit('todo-done',todo)" v-if="todo.NotComplete"><span class="icon is-small"> <i class="fas fa-check"></i></span><span>Mark Complete</span></button> 
    <button class="button is-primary is-small is-rounded has-text-weight-bold is-pulled-right gap-right-10" @click="$emit('open-todo-edit-ui',todo)" v-if="todo.NotComplete" style="margin-right:10px"><span class="icon is-small" > <i class="fas fa-edit"></i></span><span>Edit</span></button>
    <button class="button is-danger is-small has-text-weight-bold is-pulled-right" @click="$emit('todo-undo',todo)" v-else> <span class="icon is-small"> <i class="fas fa-times"></i></span><span>Revert</span></button>                        
    <div class="field tags" >
    <span class="tag is-primary is-medium has-text-weight-bold has-text-black" v-for="tag in todo.tags">{{tag}}
    <button class="delete" v-if="todo.tags.length>1" @click="$emit('del-tag',todo,tag)"></button>
    </span>
    </div>
    </article>
    </div>
    </div>`

})


var db = new loki('demo.json', {
    autoload: true,
    autosave: true,
    autosaveInterval: 500
});

var todo = null;

// TASK ITEM DRAWER

var app = new Vue({
    el: '#AppData',
    created: function () {
        db.loadDatabase({});             /// RESET POINT HERE
        if (!db.getCollection("reminders")) {
            todo = db.addCollection('reminders', { indices: ['order'] });
        }
        else {
            todo = db.getCollection("reminders");
        }
        db.saveDatabase();
    },
    data: {
        list: ['test1', 'test2'],
        TodoItems: null,
        showItems: true
    },
    computed : {
        datapresent : function(){
            if(this.TodoItems===null){return 0;}
            return this.TodoItems.length;
        }
    },
    mounted: function () {
        this.TodoItems = todo.chain().find({ 'NotComplete': this.showItems }).simplesort('duedate').data();
    },
    methods: {
        TodoComplete: function (item) {
            db.loadDatabase({});
            if (!db.getCollection("reminders")) {
                todo = db.addCollection('reminders', { indices: ['order'] });
            }
            else {
                todo = db.getCollection("reminders", { autoupdate: true });
            };
            var CObj = todo.findOne({ order: item.order });
            CObj.NotComplete = false;
            todo.update(CObj);
            db.saveDatabase();
            app.TodoItems = todo.chain().find({ 'NotComplete': this.showItems }).simplesort('duedate').data();
        },
        TodoUndo: function (item) {
            db.loadDatabase({});
            if (!db.getCollection("reminders")) {
                todo = db.addCollection('reminders', { indices: ['order'] });
            }
            else {
                todo = db.getCollection("reminders", { autoupdate: true });
            };
            let CObj = todo.findOne({ order: item.order });
            CObj.NotComplete = true;
            todo.update(CObj);
            db.saveDatabase();
            app.TodoItems = todo.chain().find({ 'NotComplete': this.showItems }).simplesort('duedate').data();
        },
        TodoDelete: function (item) {
            db.loadDatabase({});
            if (!db.getCollection("reminders")) {
                todo = db.addCollection('reminders', { indices: ['order'] });
            }
            else {
                todo = db.getCollection("reminders", { autoupdate: true });
            };
            let DObj = todo.findOne({ order: item.order });
            todo.remove(DObj);
            db.saveDatabase();
            app.TodoItems = todo.chain().find({ 'NotComplete': this.showItems }).simplesort('duedate').data();
        },
        TodoDelTag: function (item, tagName) {
            // // console.log("delete " + tagName + " from " + item);
            db.loadDatabase({});
            if (!db.getCollection("reminders")) {
                todo = db.addCollection('reminders', { indices: ['order'] });
            }
            else {
                todo = db.getCollection("reminders", { autoupdate: true });
            };
            let Obj = todo.findOne({ order: item.order });
            //logic to remove the item
            let i = Obj.tags.indexOf(tagName);
            if (i !== -1) { Obj.tags.splice(i, 1); }
            //update the object again
            todo.update(Obj);
            db.saveDatabase();
            app.TodoItems = todo.chain().find({ 'NotComplete': this.showItems }).simplesort('duedate').data();
        },
        OpenTodoEdit: function (item) {
            //updates the editme value to true of the task item to open the edit-ui
            // // console.log("Edit Todo: " + item);
            db.loadDatabase({});
            if (!db.getCollection("reminders")) {
                todo = db.addCollection('reminders', { indices: ['order'] });
            }
            else {
                todo = db.getCollection("reminders", { autoupdate: true });
            };
            let Obj = todo.findOne({ order: item.order });
            Obj.editMe = true;
            todo.update(Obj);
            db.saveDatabase();
            app.TodoItems = todo.chain().find({ 'NotComplete': this.showItems }).simplesort('duedate').data();
        },
        EditTodo: function (item) {
            // receives the todo/task item from the child and searches it in the DB
            // then updates the found item with the item received from the child
            // // console.log("Edit Todo: " + item);
            db.loadDatabase({});
            if (!db.getCollection("reminders")) {
                todo = db.addCollection('reminders', { indices: ['order'] });
            }
            else {
                todo = db.getCollection("reminders", { autoupdate: true });
            };
            let Obj = todo.findOne({ order: item.order });
            Obj.NotComplete = item.NotComplete
            Obj.editMe = false;
            Obj.title = item.title
            Obj.content = item.content;
            Obj.tags = item.tags;
            Obj.duedate = item.duedate;
            todo.update(Obj);
            db.saveDatabase();
            app.TodoItems = todo.chain().find({ 'NotComplete': this.showItems }).simplesort('duedate').data();
        },
        CloseTodoEdit: function (item) {
            // updates the editme value to false so the edit ui is closed and nothing is saved
            // // console.log("Edit Todo: " + item);
            db.loadDatabase({});
            if (!db.getCollection("reminders")) {
                todo = db.addCollection('reminders', { indices: ['order'] });
            }
            else {
                todo = db.getCollection("reminders", { autoupdate: true });
            };
            let Obj = todo.findOne({ order: item.order });
            Obj.editMe = false;
            todo.update(Obj);
            db.saveDatabase();
            app.TodoItems = todo.chain().find({ 'NotComplete': this.showItems }).simplesort('duedate').data();
        }
    }
})



// var panel = new Vue({
//     el: '#panel-list',
//     data: {
//         PanelRecords: ['bulmahsdgjasgdjhagsdjhgasjhdgasjhadajshdkjahsdkjhaskdjhaksjdhkasjhdkjashga','marksheet','minireset.css','jgthms.github.io']
//     }

// });

/// TESTING

// var DateApp = new Vue({
//     el: "#DateApp",
//     data: {
//         dateval: ""
//     },
//     computed: {
//         calculatedDate: function () {
//             // // // console.log(this.dateval);
//             return Math.abs(((new Date('2018', '08', '21')) - (new Date('2018', '07', '21'))) / (24 * 60 * 60 * 1000));
//         }
//     }

// })