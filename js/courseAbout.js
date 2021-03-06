import {
    getCourseAbout
} from './api/courseInfo.js';
getCourseAbout(aboutCourse => {
    renderCorseProfile(aboutCourse);
});
console.log(aboutCourse);

function checkenroll() {

    let value = document.getElementById("enroll").value;
    console.log(value);
    if (value === 'enroll') {
        enroll();
        value = 'dropout';
    } else {
        dropout();
        value = 'enroll';
    }
}

//  ====================== Course Page ==========================
function renderCorseProfile(courseInfo) {
    const pagePhotoHtml = ` {
                <div class="picture"><a href="./NGO info.html?id=${courseInfo[0].id_ngo}"><img src="http://localhost:3000${courseInfo[0].logo}" alt="HTML" title="HTML"></a>
                </div>
                <ul class="ul">
                    <li>${courseInfo[0].title}</li>
                    <li>${courseInfo[0].start_date}</li>
                    <li>${courseInfo[0].location}</li>
                    <li>${courseInfo[0].number_of_seats}</li>
                </ul>
                <h3 id="msg" style="margin-top: 0px;margin-left: 90px;visibility: hidden;">DONE</h3><br>
                <button id="enroll" style="bottom: 10px;">ENROLL</button>
                
    `;
    const aboutCourseHtml = `
                <h2 class="bio">${courseInfo[0].title}</h2>
                <hr>
                <p> ${courseInfo[0].description} </p>
    `;
    document.getElementById('pagePhoto').innerHTML = pagePhotoHtml;
    document.getElementById('aboutCourse').innerHTML = aboutCourseHtml;
    let id = getParameterByName("id", url);
    console.log(id);
    let idtrainee = localStorage.getItem("id");
    console.log(idtrainee);

    fetch("http://localhost:3000/trainee", {
            method: 'GET',
        })
        .then(re => re.json())
        .then(data => {
            console.log(data)
            // console.log(data.id==id);
            let res = data.find(e => e.id == id && e.id_trainee == idtrainee);
            console.log(res)
            if (res == undefined) {
                document.getElementById("enroll").innerHTML = 'enroll';
                document.getElementById("enroll").setAttribute('value', 'enroll');
                let value = document.getElementById("enroll").value;
                console.log(value);
                //    alert('done')
            } else {
                document.getElementById("enroll").innerHTML = 'dropout';
            }
        })
    // document.getElementById("enrollCourse").addEventListener("click", enroll);
    document.getElementById("enroll").addEventListener("click", checkenroll);
}
const url = window.location.href;
console.log(getParameterByName("id", url));

function getParameterByName(name, url) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
// document.getElementById("enrollCourse").addEventListener("click", enroll);
function enroll() {
    let idcourses = getParameterByName("id", url);
    console.log(localStorage.getItem("id"));
    console.log(localStorage.getItem("token") == null);
    if (localStorage.getItem("token") !== null) {
        fetch("http://localhost:3000/trainee/addcourse", {
                method: "POST",
                headers: {
                    "Content-Type": "Application/json"
                },
                body: JSON.stringify({
                    idtrainee: localStorage.getItem("id"),
                    idcourses: idcourses
                })
            })
            .then(re => re.json())
            .then(data => {
                console.log(data);
                // alert("DONE....updata page")
                document.getElementById("msg").style.visibility="visible";
            });
    } else {
        // alert("Login OR Resgtaer");
        window.location.href = "../login.html";
    }
}

function dropout() {
    const id_trainee = localStorage.getItem("id_c");
    console.log(id_trainee)
    if (localStorage.getItem("token") !== null) {
        fetch("http://localhost:3000/courses/trainee/" + id_trainee, {
                method: 'DELETE'
            })
            .then(re => {
                return re.json()
            })
            .then(data => {
                console.log(data);
                // alert("DONE")
                document.getElementById("msg").style.visibility="visible";
            })
    } else {
        // alert("Login OR Resgtaer");
        window.location.href = "../Front_End_Courses.html";
    }
}
// if(data.status!==200){
//     alert("please Login");
//     window.location.href="../login.html";
// }else{
//     // window.location.href="../Course/NewCourse.html"
// }