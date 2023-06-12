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
  if (registerFName.value == "") {
    document.getElementById("registerPromptMessage").innerHTML =
      "Enter proper Name";
    document.getElementById("promptMsg").style.display = "block";
    setTimeout(() => {
      let prompt = document.getElementById("promptMsg");
      prompt.style.display = "none";
    }, 3000);
  }
  // Validation for Email.
  else if (
    /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(registerEmail.value) !=
    true
  ) {
    document.getElementById("registerPromptMessage").innerHTML =
      "Enter Valid E-Mail ID";
    document.getElementById("promptMsg").style.display = "block";
    setTimeout(() => {
      let prompt = document.getElementById("promptMsg");
      prompt.style.display = "none";
    }, 3000);
  }
  // Validation for Phone number.
  else if (/^[6-9][0-9]{9}$/.test(registerPhone.value) != true) {
    document.getElementById("registerPromptMessage").innerHTML =
      "Enter Valid Phone number";
    document.getElementById("promptMsg").style.display = "block";
    setTimeout(() => {
      let prompt = document.getElementById("promptMsg");
      prompt.style.display = "none";
    }, 3000);
  }
  // validation for username.
  else if (registerUname.value == "") {
    document.getElementById("registerPromptMessage").innerHTML =
      "Enter proper UserName";
    document.getElementById("promptMsg").style.display = "block";
    setTimeout(() => {
      let prompt = document.getElementById("promptMsg");
      prompt.style.display = "none";
    }, 3000);
  }
  // Validation for Password.
  else if (registerPassword.value == "") {
    document.getElementById("registerPromptMessage").innerHTML =
      "Enter proper Password";
    document.getElementById("promptMsg").style.display = "block";
    setTimeout(() => {
      let prompt = document.getElementById("promptMsg");
      prompt.style.display = "none";
    }, 3000);
  } else {
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
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => {
        response.json();
        location.href = "LoginPage.html";
      })
      .then((json) => console.log(json));
  }
}

// on clicking signin button in login page

function LogIn() {
  const UserLoginName = document.getElementById("UserLoginInput");
  const PasswordLoginInput = document.getElementById("PasswordLoginInput");
  var userData;
  // Fetching data from the Mock Api.
  fetch("https://6434f30f83a30bc9ad545d2d.mockapi.io/mockdata")
    .then((data) => {
      return data.json();
    })
    .then((objectData) => {
      console.log(objectData);
      userData = objectData;

      for (i = 0; i < userData.length; i++) {
        if (UserLoginName.value == userData[i].Uname) {
          if (PasswordLoginInput.value == userData[i].Password) {
            var userId = userData[i].id;
            document.cookie = userId;
            location.href = "LMSDashboard.html";
          } else {
            alert("Wrong Password");
          }
        } else {
          alert("Invalid UserName");
        }
      }
    });
}

// On clicking submitting request on laundry request page

function submitRequest() {
  console.log(document.cookie, "this is cookie");
  const requestDate = document.getElementById("date");
  const requestTop = document.getElementById("top");
  const TopNumber = document.getElementById("TopwearNumber");
  const requestBottom = document.getElementById("bottom");
  const BottomNumber = document.getElementById("bottomwearNumber");
  const requestWoolen = document.getElementById("woolen");
  const WoolenNumber = document.getElementById("woolenwearNumber")
  const requestService = document.getElementById("service");
  const requestContact = document.getElementById("contact");
  const requestDesc = document.getElementById("desc");

  const totalCost =
  TopNumber.value * 12 + BottomNumber.value * 22 + WoolenNumber.value * 20;
  if (/^[7-9][0-9]{9}$/.test(requestContact.value) == true) {
    var link =
      "https://6434f30f83a30bc9ad545d2d.mockapi.io/mockdata/" + document.cookie;
    fetch(link)
      .then((data) => {
        return data.json();
      })
      .then((Data) => {
        var RequestId = (Data.LMSrequest.length + 1);
        var newRequest = {
          Date: requestDate.value,
          TopWear: requestTop.value,
          TopNumber: TopNumber.value,
          BottomWear: requestBottom.value,
          BottomNumber: BottomNumber.value,
          WollenWear: requestWoolen.value,
          WoolenNumber: WoolenNumber.value,
          TypeofService: requestService.value,
          ContactDetails: requestContact.value,
          Description: requestDesc.value,
          RequestId : RequestId,
          Processed : false,
          Completed : false,
          Delivered : false
        };
        var LmsRequest;
        var link = "https://6434f30f83a30bc9ad545d2d.mockapi.io/mockdata/" + document.cookie;
        fetch(link)
          .then((data) => {
            return data.json();
          })
          .then((Data) => {
            LmsRequest = Data.LMSrequest;
            LmsRequest.push(newRequest);
            fetch(link, {
              method: "PATCH",
              body: JSON.stringify({
                LMSrequest: LmsRequest,
              }),
              headers: {
                "Content-type": "application/json; charset=UTF-8",
              },
            })
              .then((response) => response.json())
              .then((json) => console.log(json));

            requestDate.value = "";
            requestTop.value = "Top Wear";
            requestBottom.value = "Bottom Wear";
            requestWoolen.value = "Woolen Wear";
            requestService.value = "Full wash";
            requestContact.value = null;
            requestDesc.value = null;
            TopNumber.value = null;
            BottomNumber.value = null;
            WoolenNumber.value = null;
            console.log(Data,"this is data");
            var SuccessMessage = document.getElementById("successMsg");
            SuccessMessage.innerHTML =
              "Submitted Successfully " + "your total cost is Rs. "+ totalCost;
            document.getElementById("successMsg").style.display = "block";
            setTimeout(() => {
              document.getElementById("successMsg").style.display = "none";
            }, 5000);
          });
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
              prompt.style.display = "none";
            }, 5000);
          }
        }
      }
    });
}

var a = 0;
// On clicking show details in the dashboard page
function ShowAccepted() {
  document.getElementById("DetailsPage").style.display = "block";
  fetch(
    "https://6434f30f83a30bc9ad545d2d.mockapi.io/mockdata/" + document.cookie
  )
    .then((data) => {
      return data.json();
    })
    .then((Objectdata) => {
      if (a == 0) {
        a++;

        for (var i = 0; i < Objectdata.LMSrequest.length; i++) {

          if(Objectdata.LMSrequest[i].Delivered == false){
          const SingleDetail = document.createElement("div");
          DetailsPage.appendChild(SingleDetail);
          SingleDetail.className = "SingleDetail";

          const SubmitDate = document.createElement("div");
          SingleDetail.appendChild(SubmitDate);
          SubmitDate.className = "SubmitDetails";
          SubmitDate.innerHTML = "date :" + Objectdata.LMSrequest[i].Date;

          const SubmitTop = document.createElement("div");
          SingleDetail.appendChild(SubmitTop);
          SubmitTop.className = "SubmitDetails";
          SubmitTop.innerHTML = "Top Wear :" + Objectdata.LMSrequest[i].TopWear;

          const SubmitBottom = document.createElement("div");
          SingleDetail.appendChild(SubmitBottom);
          SubmitBottom.className = "SubmitDetails";
          SubmitBottom.innerHTML =
          "Bottom Wear :" + Objectdata.LMSrequest[i].BottomWear;

          const SubmitWollen = document.createElement("div");
          SingleDetail.appendChild(SubmitWollen);
          SubmitWollen.className = "SubmitDetails";
          SubmitWollen.innerHTML =
            "Wollen Wear :" + Objectdata.LMSrequest[i].WollenWear;

          const SubmitService = document.createElement("div");
          SingleDetail.appendChild(SubmitService);
          SubmitService.className = "SubmitDetails";
          SubmitService.innerHTML =
            "Type of Service :" + Objectdata.LMSrequest[i].TypeofService;

          const SubmitContact = document.createElement("div");
          SingleDetail.appendChild(SubmitContact);
          SubmitContact.className = "SubmitDetails";
          SubmitContact.innerHTML =
            "Contact Details :" + Objectdata.LMSrequest[i].ContactDetails;

          const SubmitDesc = document.createElement("div");
          SingleDetail.appendChild(SubmitDesc);
          SubmitDesc.className = "SubmitDetails";
          SubmitDesc.innerHTML =
            "Description :" + Objectdata.LMSrequest[i].Description;

            console.log(Objectdata.LMSrequest[i].Processed);

            if(Objectdata.LMSrequest[i].Processed == true){
                const ProcessedMsg = document.createElement("div");
                SingleDetail.appendChild(ProcessedMsg);
                ProcessedMsg.className = "ProcessedMsg";
                ProcessedMsg.innerHTML = "Processed"
            }
            if(Objectdata.LMSrequest[i].Completed == true){
                const CompletedMsg = document.createElement("div");
                SingleDetail.appendChild(CompletedMsg);
                CompletedMsg.className = "CompletedMsg";
                CompletedMsg.innerHTML = "Completed! You can Collect your Cloth"
            }
                               
            }

        }
      }
    });
}

// On clicking close button in the request details display
function closeDisplay() {
  document.getElementById("DetailsPage").style.display = "none";
  SingleDetail.remove();
}

// On clicking change password
function ChangePassword() {
  const OldPassword = document.getElementById("OldPassword");
  const NewPassword = document.getElementById("NewPassword");
  const ConfirmPassword = document.getElementById("ConfirmPassword");
  var UserID;
  var Api = "https://6434f30f83a30bc9ad545d2d.mockapi.io/mockdata";

  if (NewPassword.value != ConfirmPassword.value) {
    document.getElementById("errorMsg").style.display = "block";
    setTimeout(() => {
      let prompt = document.getElementById("errorMsg");
      prompt.style.display = "none";
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
            fetch(Api + "/" + UserID, {
              method: "PATCH",
              body: JSON.stringify({
                Password: NewPassword.value,
              }),
              headers: {
                "Content-type": "application/json; charset=UTF-8",
              },
            })
              .then((response) => {
                response.json(), (OldPassword.value = "");
                NewPassword.value = "";
                ConfirmPassword.value = "";
              })
              .then((json) => console.log(json));
            document.getElementById("PsdchangeMsg").style.display = "block";
            setTimeout(() => {
              let prompt = document.getElementById("PsdchangeMsg");
              prompt.style.display = "none";
            }, 3000);
          }
        }
      });
  }
}

//
var a = 0;
const UserRequest = document.getElementById("UserRequest");
function ShowDetails() {
  fetch("https://6434f30f83a30bc9ad545d2d.mockapi.io/mockdata/")
    .then((data) => {
      return data.json();
    })
    .then((objectData) => {
      if (a == 0) {
        a++;
        for (var i = 0; i < objectData.length; i++) {

          const SingleUser = document.createElement("div");
          UserRequest.appendChild(SingleUser);
          SingleUser.className = "SingleUser";

          const UserName = document.createElement("div");
          SingleUser.appendChild(UserName);
          UserName.className = "UserDetailText";
          UserName.innerHTML = "User Name :" + objectData[i].Uname;

          const FirstName = document.createElement("div");
          SingleUser.appendChild(FirstName);
          FirstName.className = "UserDetailText";
          FirstName.innerHTML = "First Name :" + objectData[i].Fname;

          const PhoneNum = document.createElement("div");
          SingleUser.appendChild(PhoneNum);
          PhoneNum.className = "UserDetailText";
          PhoneNum.innerHTML = "Contact Number :" + objectData[i].PhoneNum;

          const RequestText = document.createElement("div");
          SingleUser.appendChild(RequestText);
          RequestText.className = "RequestText";
          RequestText.innerHTML = "Request Submitted by " + objectData[i].Fname;

          for (var j = 0; j < objectData[i].LMSrequest.length; j++) {

            if(objectData[i].LMSrequest[j].Delivered == false){
            const UserLMSRequest = document.createElement("div");
            SingleUser.appendChild(UserLMSRequest);
            UserLMSRequest.className = "UserLMSRequest";

            const RequestNumber = document.createElement("div");
            UserLMSRequest.appendChild(RequestNumber);
            RequestNumber.className = "RequestNumber";
            RequestNumber.innerHTML = "Request Number " + (j + 1);

            if(objectData[i].LMSrequest[j].Completed == false){
            const CompletedButton = document.createElement("button");
            UserLMSRequest.appendChild(CompletedButton);
            CompletedButton.className = "CompletedButton";
            CompletedButton.innerHTML = "Completed";
            CompletedButton.addEventListener('click', CompletetaskFun.bind(this,objectData[i].id,objectData[i].LMSrequest[j].RequestId))
          }

            if(objectData[i].LMSrequest[j].Processed == false){
            const processBtn = document.createElement("button");
            UserLMSRequest.appendChild(processBtn);
            processBtn.className = "AcceptedButton";
            processBtn.innerHTML = "Process";
            processBtn.addEventListener("click",StartProcessingFun.bind(this,objectData[i].id,objectData[i].LMSrequest[j].RequestId));
            }
            if(objectData[i].LMSrequest[j].Processed == true && objectData[i].LMSrequest[j].Completed == true){
              const ReceivedBtn = document.createElement("button");
              UserLMSRequest.appendChild(ReceivedBtn);
              ReceivedBtn.className = "ReceivedBtn";
              ReceivedBtn.innerHTML = "Delivered";
              ReceivedBtn.addEventListener('click', ReceivedFun.bind(this,objectData[i].id,objectData[i].LMSrequest[j].RequestId)) 
          }

            const SubmitDate = document.createElement("div");
            UserLMSRequest.appendChild(SubmitDate);
            SubmitDate.className = "SubmitDetails";
            SubmitDate.innerHTML = "date :" + objectData[i].LMSrequest[j].Date;

            const SubmitTop = document.createElement("div");
            UserLMSRequest.appendChild(SubmitTop);
            SubmitTop.className = "SubmitDetails";
            SubmitTop.innerHTML =
              "Top Wear :" + objectData[i].LMSrequest[j].TopWear + " x " + objectData[i].LMSrequest[j].TopNumber;

            const SubmitBottom = document.createElement("div");
            UserLMSRequest.appendChild(SubmitBottom);
            SubmitBottom.className = "SubmitDetails";
            SubmitBottom.innerHTML =
              "Bottom Wear :" + objectData[i].LMSrequest[j].BottomWear+ " x " + objectData[i].LMSrequest[j].BottomNumber;

            const SubmitWollen = document.createElement("div");
            UserLMSRequest.appendChild(SubmitWollen);
            SubmitWollen.className = "SubmitDetails";
            SubmitWollen.innerHTML =
              "Wollen Wear :" + objectData[i].LMSrequest[j].WollenWear+ " x " + objectData[i].LMSrequest[j].WoolenNumber;

            const SubmitService = document.createElement("div");
            UserLMSRequest.appendChild(SubmitService);
            SubmitService.className = "SubmitDetails";
            SubmitService.innerHTML =
              "Type of Service :" + objectData[i].LMSrequest[j].TypeofService;

            const SubmitContact = document.createElement("div");
            UserLMSRequest.appendChild(SubmitContact);
            SubmitContact.className = "SubmitDetails";
            SubmitContact.innerHTML =
              "Contact Details :" + objectData[i].LMSrequest[j].ContactDetails;

            const SubmitDesc = document.createElement("div");
            UserLMSRequest.appendChild(SubmitDesc);
            SubmitDesc.className = "SubmitDetails";
            SubmitDesc.innerHTML =
              "Description :" + objectData[i].LMSrequest[j].Description;
          }
        }
        }
      }
    });
}

// To start Processing

function StartProcessingFun(userId, detailsId) {
  fetch("https://6434f30f83a30bc9ad545d2d.mockapi.io/mockdata/"+userId)
  .then((data) => {
    return data.json();
  })
  .then((objectData) => {
    objectData.LMSrequest[detailsId-1].Processed = true;


  fetch("https://6434f30f83a30bc9ad545d2d.mockapi.io/mockdata/"+userId, {
    method: "PATCH",
    body: JSON.stringify({
        LMSrequest : objectData.LMSrequest
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
//   console.log(objectData.LMSrequest[detailsId-1].Processed,"after processed");
.then(ShowDetails(),
ShowAccepted())
})

  
}


function CompletetaskFun(userId, detailsId) {
    fetch("https://6434f30f83a30bc9ad545d2d.mockapi.io/mockdata/"+userId)
    .then((data) => {
      return data.json();
    })
    .then((objectData) => {
      objectData.LMSrequest[detailsId-1].Completed = true;
  
  
    fetch("https://6434f30f83a30bc9ad545d2d.mockapi.io/mockdata/"+userId, {
      method: "PATCH",
      body: JSON.stringify({
          LMSrequest : objectData.LMSrequest
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
    .then(ShowDetails(),
    ShowAccepted())

  })
  
    
  }

function AdminLogIn() {
  const AdminUserName = document.getElementById("AdminLoginInput");
  const AdminPassword = document.getElementById("AdminPassword");

  if (AdminUserName.value == "Admin") {
    if (AdminPassword.value == "Admin") {
      location.href = "AdminPage.html";
    } else {
      alert("Wrong Password");
    }
  } else {
    alert("Wrong USername");
  }
}
function adminPasswordToggle(){
const passwordToggle = document.getElementById("passwordToggle");
const password = document.getElementById("AdminPassword");
const type = password.getAttribute('type') === 'password'? 'text' : 'password';
password.setAttribute('type', type);
passwordToggle.classList.toggle('bi-eye');
}
function OldPasswordToggle(){
    const passwordToggle = document.getElementById("oldPasswordIcon");
    const password = document.getElementById("OldPassword");
    const type = password.getAttribute('type') === 'password'? 'text' : 'password';
    password.setAttribute('type', type);
    passwordToggle.classList.toggle('bi-eye');
}
function NewPasswordToggle(){
    const passwordToggle = document.getElementById("newPaswordIcon");
    const password = document.getElementById("NewPassword");
    console.log("Eye clicked");
    const type = password.getAttribute('type') === 'password'? 'text' : 'password';
    password.setAttribute('type', type);
    passwordToggle.classList.toggle('bi-eye');
}
function ReceivedFun(userID, RequetID){
  console.log(userID,RequetID,"this is tyis and thos");
  fetch("https://6434f30f83a30bc9ad545d2d.mockapi.io/mockdata/"+userID)
    .then((data) => {
      return data.json();
    })
    .then((objectData) => {
      objectData.LMSrequest[RequetID-1].Delivered = true;
  
  
    fetch("https://6434f30f83a30bc9ad545d2d.mockapi.io/mockdata/"+userID, {
      method: "PATCH",
      body: JSON.stringify({
          LMSrequest : objectData.LMSrequest
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
    .then(ShowDetails(),
    ShowAccepted())
})
}
function SigninPasswordToggle(){
  const passwordToggle = document.getElementById("SigninPaswordIcon");
  const password = document.getElementById("PasswordLoginInput");
  console.log("Eye clicked");
  const type = password.getAttribute('type') === 'password'? 'text' : 'password';
  password.setAttribute('type', type);
  passwordToggle.classList.toggle('bi-eye');
}
function SignupPasswordToggle(){
  const passwordToggle = document.getElementById("SignupPasswordToggle");
  const password = document.getElementById("registerPassword");
  console.log("Eye clicked");
  const type = password.getAttribute('type') === 'password'? 'text' : 'password';
  password.setAttribute('type', type);
  passwordToggle.classList.toggle('bi-eye');
}