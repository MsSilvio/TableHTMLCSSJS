$(document).ready(function() {
    fetch("curriculum.json")
    .then((rawData) => rawData.json())
    .then((curriculum) => {
        //console.log(curriculum);
        //Initialize
        //Semester level
        let sem = ["First Year, First Semester",
                    "First Year, Second Semester",
                    "Second Year, First Semester",
                    "Second Year, Second Semester",
                    "Third Year, First Semester",
                    "Third Year, Second Semester",
                    "Fourth Year, First Semester",
                    "Fourth Year, Second Semester"];
        let semcount = 0;

        const columnName = {"Course": 15,
                            "Description": 25,
                            "Unit": 8,
                            "Grade": 10,
                            "Remarks" : 12,
                            "Course2": 16,
                            "Term": 25}

        //get the subjects for each semester
        curriculum.forEach(subjects => {
            //Header
                //Title
                $(".tablebody").append(
                    `<tr class="table-title">
                        <th colspan="7">${sem[semcount++]}</th>
                    </tr>`
                )
                //Column name
                let tableHeadHTML;
                for (let x in columnName) {
                    //For the second course column
                    if(x === "Course2")
                        tableHeadHTML += `<td width=${columnName[x]}%>${x.substring(0,(x.length-1))}</td>`;  
                    else
                        tableHeadHTML += `<td width=${columnName[x]}%>${x}</td>`;
                }
                $(".tablebody").append(
                    `<tr class="table-head">
                        ${tableHeadHTML}
                    </tr>`
                )
            //Body
            for (let i in subjects) {
                //Initialize data
                let subject = subjects[i];
                let course = subject["Course"];
                let course2 = subject["Course"];
                let desc = subject["Description"];
                let unit = subject["Unit"];
                let grade = subject["Grade"];
                let remarks = subject["Remarks"];
                let term = subject["Term"];

                //Check if the subject is already taken, in progress, or not
                let cssclass;
                switch (remarks) {
                    case "Passed":
                        cssclass = "table-body-taken"
                        break;
                    case "":
                        cssclass = "table-body-not-taken"
                        course2 = "";
                        break;
                    case "In progress":
                        cssclass = "table-body-in-progress"
                        course2 = "";
                        break;
                }

                //Display body
                $(".tablebody").append(
                    `<tr class="${cssclass}">
                    <td>${course}</td>
                    <td>${desc}</td>
                    <td>${unit}</td>
                    <td>${grade}</td>
                    <td>${remarks}</td>
                    <td>${course2}</td>
                    <td>${term}</td>
                    </tr>`
                )
            }
        });
    });
})