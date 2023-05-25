const registerSubmit = document.getElementById("registerSubmit");




// on clicking signup button in register page


function RegisterSubmit() {
    const registerFName = document.getElementById("registerFname");
    const registerEmail = document.getElementById("registerEmail");
    const registerPhone = document.getElementById("registerPhone");
    const registerUname = document.getElementById("registerUname");
    const registerPrompt = document.getElementById("promptMsg");
    const registerPassword = document.getElementById("registerPassword");

    // validation for Name.
    if (registerFName.value == '') {
        document.getElementById("registerPromptMessage").innerHTML = "Enter proper Name";
        document.getElementById("promptMsg").style.display = "block";
        setTimeout(() => {
            let prompt = document.getElementById("promptMsg");
            prompt.style.display = 'none';
        }, 3000);
    }
    // Validation for Email.
    else if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(registerEmail.value) != true) {
        document.getElementById("registerPromptMessage").innerHTML = "Enter Valid E-Mail ID";
        document.getElementById("promptMsg").style.display = "block";
        setTimeout(() => {
            let prompt = document.getElementById("promptMsg");
            prompt.style.display = 'none';
        }, 3000);
    }
    // Validation for Phone number.
    else if (/^[7-9][0-9]{9}$/.test(registerPhone.value) != true) {
        document.getElementById("registerPromptMessage").innerHTML = "Enter Valid Phone number";
        document.getElementById("promptMsg").style.display = "block";
        setTimeout(() => {
            let prompt = document.getElementById("promptMsg");
            prompt.style.display = 'none';
        }, 3000);
    }
    // validation for username.
    else if (registerUname.value == '') {
        document.getElementById("registerPromptMessage").innerHTML = "Enter proper UserName";
        document.getElementById("promptMsg").style.display = "block";
        setTimeout(() => {
            let prompt = document.getElementById("promptMsg");
            prompt.style.display = 'none';
        }, 3000);
    }
    // Validation for Password.
    else if (registerPassword.value == '') {
        document.getElementById("registerPromptMessage").innerHTML = "Enter proper Password";
        document.getElementById("promptMsg").style.display = "block";
        setTimeout(() => {
            let prompt = document.getElementById("promptMsg");
            prompt.style.display = 'none';
        }, 3000);
    }
    else {
        // Sending data to MockApi dataset.
        fetch("https://6434f30f83a30bc9ad545d2d.mockapi.io/mockdata", {
            method: "POST",
            body: JSON.stringify({
                Fname: registerFName.value,
                Email: registerEmail.value,
                PhoneNum: registerPhone.value,
                Uname: registerUname.value,
                Password: registerPassword.value,
                LMSrequest: [],
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then(response => { response.json(); location.href = "LoginPage.html"; })
            .then(json => console.log(json));
    }
}



// on clicking signin button in login page

function LogIn() {
    const UserLoginName = document.getElementById("UserLoginInput");
    const PasswordLoginInput = document.getElementById("PasswordLoginInput");
    var userData;
    // Fetching data from the Mock Api.
    fetch("https://6434f30f83a30bc9ad545d2d.mockapi.io/mockdata").then((data) => {
      
        return data.json();
    })
        .then((objectData) => {
            userData = objectData;

            for (i = 0; i < userData.length; i++) {
                if (UserLoginName.value == userData[i].Uname) {
                    if (PasswordLoginInput.value == userData[i].Password) {
                        var userId = userData[i].id;
                        document.cookie = userId;
                        location.href = "LMSDashboard.html";
                    }
                }
            }
        },
        )
}


// On clicking submitting request on laundry request page


function submitRequest() {

    const requestDate = document.getElementById("date");
    const requestTop = document.getElementById("top");
    const requestBottom = document.getElementById("bottom");
    const requestWoolen = document.getElementById("woolen");
    const requestService = document.getElementById("service");
    const requestContact = document.getElementById("contact");
    const requestDesc = document.getElementById("desc");
    const requestForm = document.getElementById("requestForm");
    if (/^[7-9][0-9]{9}$/.test(requestContact.value) == true) {
        var newRequest = { Date: requestDate.value, TopWear: requestTop.value, BottomWear: requestBottom.value, WollenWear: requestWoolen.value, TypeofService: requestService.value, ContactDetails: requestContact.value, Description: requestDesc.value };
        var LmsRequest;
        var link = "https://6434f30f83a30bc9ad545d2d.mockapi.io/mockdata/" + document.cookie
        fetch(link).then((data) => {
            return data.json();
        })
            .then((Data) => {
                LmsRequest = Data.LMSrequest;
                LmsRequest.push(newRequest);
                console.log(LmsRequest, "lol");
                fetch(link, {
                    method: "PATCH",
                    body: JSON.stringify({
                        LMSrequest: LmsRequest
                    }),
                    headers: {
                        "Content-type": "application/json; charset=UTF-8"
                    },
                })
                    .then(response => response.json())
                    .then(json => console.log(json));

                requestDate.value = ''
                requestTop.value = null
                requestBottom.value = null
                requestWoolen.value = null
                requestService.value = 'Full wash'
                requestContact.value = null
                requestDesc.value = null;
                document.getElementById("successMsg").style.display = "block";
                setTimeout(() => {
                    let prompt = document.getElementById("successMsg");
                    prompt.style.display = 'none';
                }, 3000);

            });

    }

}

function ForgotPassword() {
    const ForgotEmail = document.getElementById("ForgotEmail");
    const ForgotUname = document.getElementById("ForgotUname");
    var ForgotPassword;

    fetch("https://6434f30f83a30bc9ad545d2d.mockapi.io/mockdata")
        .then((data) => {
            return data.json();
        })
        .then((objectData) => {
            for (var i = 0; i < objectData.length; i++) {
                if (ForgotEmail.value == objectData[i].Email) {
                    if (ForgotUname.value == objectData[i].Uname) {
                        ForgotPassword = objectData[i].Password;
                        document.getElementById("Password").innerHTML = ForgotPassword;
                        document.getElementById("successMsg").style.display = "block";
                        setTimeout(() => {
                            let prompt = document.getElementById("successMsg");
                            prompt.style.display = 'none';
                        }, 5000);
                    }
                }
            }

        })


}

var a=0;
// On clicking show details in the dashboard page
function ShowAccepted() {

    document.getElementById("DetailsPage").style.display = "block";
    fetch("https://6434f30f83a30bc9ad545d2d.mockapi.io/mockdata/"+document.cookie)
    .then((data) => {
        return data.json();
    })
    .then((Objectdata) =>{

        if(a==0){
            a++;

        for(var i=0;i<Objectdata.LMSrequest.length;i++){

            const SingleDetail = document.createElement('div');
            DetailsPage.appendChild(SingleDetail);
            SingleDetail.className='SingleDetail';

            const SubmitDate = document.createElement('div');
            SingleDetail.appendChild(SubmitDate);
            SubmitDate.className='SubmitDetails';
            SubmitDate.innerHTML="date :"+Objectdata.LMSrequest[i].Date;

            const SubmitTop = document.createElement('div');
            SingleDetail.appendChild(SubmitTop);
            SubmitTop.className='SubmitDetails';
            SubmitTop.innerHTML="Top Wear :"+Objectdata.LMSrequest[i].TopWear;

            const SubmitBottom = document.createElement('div');
            SingleDetail.appendChild(SubmitBottom);
            SubmitBottom.className='SubmitDetails';
            SubmitBottom.innerHTML="Bottom Wear :"+Objectdata.LMSrequest[i].BottomWear;

            const SubmitWollen = document.createElement('div');
            SingleDetail.appendChild(SubmitWollen);
            SubmitWollen.className='SubmitDetails';
            SubmitWollen.innerHTML="Wollen Wear :"+Objectdata.LMSrequest[i].WollenWear;

            const SubmitService = document.createElement('div');
            SingleDetail.appendChild(SubmitService);
            SubmitService.className='SubmitDetails';
            SubmitService.innerHTML="Type of Service :"+Objectdata.LMSrequest[i].TypeofService;

            const SubmitContact = document.createElement('div');
            SingleDetail.appendChild(SubmitContact);
            SubmitContact.className='SubmitDetails';
            SubmitContact.innerHTML="Contact Details :"+Objectdata.LMSrequest[i].ContactDetails;

            const SubmitDesc = document.createElement('div');
            SingleDetail.appendChild(SubmitDesc);
            SubmitDesc.className='SubmitDetails';
            SubmitDesc.innerHTML="Description :"+Objectdata.LMSrequest[i].Description;
        }
    }
    })

}

// On clicking close button in the request details display 
function closeDisplay(){
    document.getElementById("DetailsPage").style.display = "none";
    SingleDetail.remove();
}

// On clicking change password
function ChangePassword() {
    const OldPassword = document.getElementById("OldPassword");
    const NewPassword = document.getElementById("NewPassword");
    const ConfirmPassword = document.getElementById("ConfirmPassword");
    var UserID;
    var Api="https://6434f30f83a30bc9ad545d2d.mockapi.io/mockdata";

    if (NewPassword.value != ConfirmPassword.value) {
        document.getElementById("errorMsg").style.display = "block";
        setTimeout(() => {
            let prompt = document.getElementById("errorMsg");
            prompt.style.display = 'none';
        }, 3000);
        console.log("hii");
    } else {

        fetch(Api)
            .then((data) => {
                return data.json();
            })
            .then((objectData) => {
                for (var i = 0; i < objectData.length; i++) {
                    if (OldPassword.value == objectData[i].Password) {
                        UserID = objectData[i].id;
                        fetch(Api+"/"+UserID,{
                            method: "PATCH",
                            body: JSON.stringify({
                                Password: NewPassword.value
                            }),
                            headers: {
                                "Content-type": "application/json; charset=UTF-8"
                            },
                        })
                            .then(response => {response.json(),
                            OldPassword.value=""
                            NewPassword.value=""
                            ConfirmPassword.value=""

                            })
                            .then(json => console.log(json));
                        document.getElementById("PsdchangeMsg").style.display = "block";
                setTimeout(() => {
                    let prompt = document.getElementById("PsdchangeMsg");
                    prompt.style.display = 'none';
                }, 3000);
                    }
                }
            })
    }
}
