<template>
    <v-container>
        
        <v-row>
            <v-dialog v-model="DialogAnnounce" max-width="300px" :style="themeColor == '' ? 'background-color:#B2DFDB' : `background-color:${themeColor}; color:white`">
                <v-card >
                    <v-card-title>
                        Announcement
                    </v-card-title>
                    <v-card-text>
                        <center><span><b>{{ message }}</b></span> </center>
                        <!--  -->
                    </v-card-text>
                </v-card>
            </v-dialog>
            <v-col cols="3">
                <v-card>
                    <v-card-title :style="themeColor == '' ? 'background-color:#B2DFDB' : `background-color:${themeColor}; color:white`">Data</v-card-title>
                    <br>
                    <v-card-text>
                        <v-data-table
                            :height="$vuetify.breakpoint.height - 380"
                            style="border: 2px solid"
                            :headers="headers"
                            :items="UserList"
                            :loading="loading"
                            :items-per-page="itemsPerPage"
                            >
                            <template v-slot:[`item.name`]="{value}">
                                <!-- <th @click="show = true;">{{ value }}</th> -->
                                <th @click="TestCreateFriendCon(value);">{{ value }}</th>
                            </template>
                        </v-data-table>
                        <div v-if="morningShow">
                            <v-img
                            :width="150"
                            cover
                            :src="`http://10.169.141.18:5556/ftp/WRR/Morning.gif`"
                        ></v-img>
                        </div>
                        <div v-if="afternoonShow">
                            <center>
                                <v-img
                                    :width="150"
                                    cover
                                    :src="`http://10.169.141.18:5556/ftp/WRR/good-afternoon.gif`"
                                ></v-img>
                            </center>
                            
                        </div>
                        
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col cols="9">
                <v-card v-if="show" class="topbar2">
                    <v-card-title :style="themeColor == '' ? 'background-color:#B2DFDB' : `background-color:${themeColor}; color:white`">ChatBot <v-spacer/>
                        <strong>{{ dateTime }} </strong></v-card-title>
                    <br>
                    <v-card-text>
                            <template>
                                <v-row>
                                    <v-col cols="12">
                                        <!-- HATE --> 
                                        <v-card flat>
                                        <v-toolbar :color="themeColor == '' ? 'primary' : themeColor"  dark flat dense>
                                            <br>
                                            <template v-slot:extension>
                                            <v-tabs v-model="tabs" centered flat>
                                                <v-tab>
                                                <v-icon>mdi-account-group</v-icon><b><p>sample data</p></b>
                                                </v-tab>
                                            </v-tabs>
                                            </template>
                                            </v-toolbar>
                                            <v-tabs-items v-model="tabs">
                                            <v-tab-item>
                                            <v-card flat>
                                                <v-card-text>
                                                    <div class="form-group"  >
                                                    <v-card style="border:1px solid black;" max-height="30%">
                                                        <div class="topbar">
                                                        <!--lOOP FOR GET THE CONVO-->
                                                        <div v-for="(item, index) in ChatBotDeatails" :key="index" >
                                            
                                                            <!--Main User -->
                                                            <div v-if="item.ID == ConvertedData[0].id" :style="item.ID == ConvertedData[0].id ?' text-align:right;':''">
                                                                
                                                            <span style=" font-weight: bold; "> 
                                                                {{ item.Name}}
                                                                <v-avatar class="ml-2" size="45" :color="themeColor == '' ? 'primary' : themeColor" @click="ViewPic(item)">
                                                                <v-avatar size="40">
                                                                    <img
                                                                    alt="no image found"
                                                                    @error="get_ErrorImage"
                                                                    :src="`http://10.169.141.18:5556/ftp/WRR/${item.IP}.jpg`"
                                                                    width="30"
                                                                    height="30px"
                                                                    />
                                                                </v-avatar>
                                                                </v-avatar>
                                                            </span>
                                                            </div>
                                            
                                                            <!--Other User-->
                                                            <div v-else>
                                                            <v-avatar class="ml-2" size="45" :color="themeColor == '' ? 'primary' : themeColor" @click="ViewPic(item)">
                                                                <v-avatar size="40">
                                                                <img
                                                                    alt="no image found"
                                                                    @error="get_ErrorImage"
                                                                    :src="`http://10.169.141.18:5556/ftp/WRR/${item.IP}.jpg`"
                                                                    width="30"
                                                                    height="30px"
                                                                />
                                                                </v-avatar>
                                                            </v-avatar>
                                                            <span style=" font-weight: bold; ">{{ item.id}}</span>
                                                            <!-- {{ ConvertedData[0].id }} -->
                                                            </div>
                                                            <!--Style and For Box style content-->
                                                            <div :id="item.ID == ConvertedData[0].id ? 'timedetails1' : 'timedetails2'">
                                                            <div  :id="item.ID == ConvertedData[0].id ? 'rcorners1' : 'rcorners2'">
                                                                <span >{{item.Details}}</span> 
                                                            </div>
                                                            <h6>{{item.created_at}}</h6>
                                                            </div>
                                                        </div>  
                                                        </div>
                                                    </v-card>
                                                    <br><hr><br>
                                                    <v-row>
                                                        <v-col cols="8">
                                                        <!--TEXT CHATT-->
                                                        <v-text-field 
                                                        v-model="Details" 
                                                        dense outlined 
                                                        label="Details"
                                                        @keypress.enter="EnterChatBotDetails()"
                                                        ></v-text-field>
                                                        <!--END HERE-->
                                                        </v-col>
                                                        <v-col cols="4">
                                                        <!--Selection of img-->
                                                        <!-- <v-autocomplete
                                                            @input="TryLoad()"
                                                            v-model="ChatBotObj.Img"
                                                            :items="GetImgs"
                                                            item-text="ImgName"
                                                            item-value="ImgName"
                                                            label="Change By IMG"
                                                            outlined
                                                            dense
                                                            clearable
                                                        >
                                                        </v-autocomplete> -->
                                                        </v-col>
                                                    </v-row>
                                                    </div>
                                                </v-card-text>
                                                </v-card>
                                            </v-tab-item>
                                            </v-tabs-items>
                                    </v-card>
                                    </v-col>
                                </v-row>
                                
                            </template>
                        <!-- <v-data-table
                            :height="$vuetify.breakpoint.height - 345"
                            style="border: 2px solid"
                            :headers="headers"
                            :items="UserList"
                            :loading="loading"
                            :items-per-page="itemsPerPage"
                            class="text-center" 
                            >
                        </v-data-table> -->
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import moment from "moment";
import Swal from "sweetalert2";
import devtools  from "devtools-detect";
export default {

    sockets: {
    // NOTE : SOCKET
    updateReceived: function (socket) {
        if (socket.updateType && socket.updateType == "GetBotChat") {
            this.GetBotChat();
        }else if(socket.updateType && socket.updateType == "getUserinside"){
            this.getUserinside()
        }
    },
    },
    data: ()=>({
        isDevToolsOpen : false,
        headers:[
            // { text:'', align:'start',value:'EmployeeCode'},
            { text:'Name', align:'start',value:'name' , width: '10%' ,align: 'center', },
        ],
        itemsPerPage: 10,
        UserList : [],
        ChatBotDeatails : [],
        loading: true,
        ChatBotDialog: false,
        ChatBotObj: {},
        dateTime: "",
        Details: '',
        tabs: null,
        Users: [],
        show: false,
        morningShow: false,
        afternoonShow: false,
        count1 : null,
        message: "",
        DialogAnnounce: false,


        toastMixin : Swal.mixin({
            toast: true,
            icon: 'success',
            title: 'General Title',
            animation : false,
            position: 'top-right',
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar : true,
            dibOpen : (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        }),
    }),
    created(){

        // this.isDevToolsOpen = devtools.isOpen
 
        // // Listen for changes
        // window.addEventListener('devtoolschange', event => {
        // this.isDevToolsOpen = event.detail.isOpen
        // })

        this.GetUserList()
        this.getUserinside()
        this.GetdateTime()
        this.GetBotChat()
        setInterval(() => {
            this.GetdateTime();
        }, 1000)
    },
    methods: {
        TestCreateFriendCon(item){
            let names = {}
            names.name = item + '/' + this.ConvertedData[0].name
            names.id = this.ConvertedData[0].id
            console.log(names)
            axios.post(`api/TestCreateFriendCon`,names).then((res)=>{
                if(res.data){
                    console.log(res.data)
                    this.show = true;
                }
            })
        },
        GetdateTime() {
            this.dateTime = moment().format("YYYY-MM-DD h:mm:ss");
            // console.log(this.dateTime)
          },
        GetUserList(){
            this.loading = true,
            console.log('getusers',this.ConvertedData[0].id)
            axios.get(`api/GetUserList`,this.ConvertedData).then((res)=>{
                this.UserList = res.data
                this.loading = false
            })
        },

        GetBotChat(){
            // console.log('con',this.ConvertedData[0])
        axios.get(`api/GetChatBotDetails`).then((res)=>{
            this.ChatBotDeatails = res.data
            console.log('getbotchat',this.ChatBotDeatails)
            this.ChatBotDeatails = this.ChatBotDeatails.map((rec)=>{
                return{
                    IP: rec.ip,
                    ID: rec.DETAILSID,
                    Name:rec.name,
                    Details:this.DecryptData(rec.Details),
                    created_at:  moment(rec.created_at).format("h:mm:ss a")
                }
            })
            
            })
        },
        //post
       async EnterChatBotDetails(){
            // console.log(this.Users)
        if(this.Details != ""){
            this.ChatBotObj.IDNumber = this.Users.id
            this.ChatBotObj.Name = this.Users.name
            this.ChatBotObj.CH = this.Users.channel
            this.ChatBotObj.Details = await this.EncryptData(this.Details);
            console.log(this.ChatBotObj)
            axios.post('api/GetChatBotDetail', this.ChatBotObj).then((res)=>{
            if(res.data){
                this.Details = ""
                this.$socket.emit("newUpdate", { updateType: "GetBotChat" });
                
            }
            })
        }
        },

        getUserinside(){
            axios({
					method: "GET",
					url: `api/GetUsers`,
					config: {
						headers: { "Content-Type": "multipart/form-data" },
					},
				}).then((res)=>{
                    console.log(res.data)
                this.Users = res.data.filter((rec)=>{
                return  rec.id == this.ConvertedData[0].id
                })
                this.Users = this.Users[0]
                console.log('user',this.Users)
            })
        },

        get_ErrorImage(event) {
            event.target.src = `http://hrdapps48:3001/ftp/employee_pictures/unkown.png`;
        },
    },

    watch:{

        isDevToolsOpen(newValue) {
        if (newValue) {
            console.log('DevTools opened')
            window.location.replace("about:blank");
        } else {
            console.log('DevTools closed')
        }
        },
        
        dateTime: function(val){
           
            const time = val.substring(11, 19);
            console.log(time)
            if(time >= '06:00:00'){
                this.morningShow = true 
                this.afternoonShow = false
            }
            else if(time >= '12:00:00'){
                this.afternoonShow = true
                this.morningShow = false
            }

            const HrTime = val.substring(12, 12);
            if(val.substring(11, 19) == HrTime+':15:00'){
                this.DialogAnnounce = true
                this.message = '1hr nalang Uwian na BBYeeee'
            }else if(val.substring(11, 19) == HrTime+':30:00'){
                this.DialogAnnounce = false
                this.message = ''
            }else if(val.substring(11, 19) == HrTime+':45:00'){
                this.DialogAnnounce = true
                this.message = '15MINS NALANG HAHAHAHAHAHAH'
            }else if(val.substring(11, 19) == HrTime+':00:00'){
                this.DialogAnnounce = false
                this.message = 'test'
            }
            

            // let total = 5 * 60; // 5 minutes in seconds
            // let remainingSeconds = total;

            // let interval = setInterval(() => {
            // if (remainingSeconds <= 0) {
            //     clearInterval(interval);
            //     // Perform actions when countdown is complete
            // } else {
            //     let minutes = Math.floor(remainingSeconds / 60);
            //     let seconds = remainingSeconds % 60;
            //     this.count1 = minutes + ':' + (seconds < 10 ? '0' : '') + seconds; // Format the time as MM:SS
            //     remainingSeconds--;
            //     // console.log(this.count1);
            // }
            // }, 1000);
    //     if(val.substring(11, 19) == '4:30:00' ){
    //       axios.post(`api/TRUNCATE`).then(() => {
    //         this.toastMixin.fire({
	// 							icon: 'error',
	// 							title : 'Wrong Password!',
	// 							animation:true,
	// 							text: 'BBYE SEE YOU BUKAS HAHAHAH',
	// 						})
    //           this.$socket.emit("newUpdate", { updateType: "GetDetailsData" });
    //       });
    //     }else if(val.substring(11, 19) == '4:58:00')
    //       axios.post(`api/TRUNCATE`).then(() => {
    //           this.toastMixin.fire({
    //               icon: 'warning',
    //               title : 'Wrong Password!',
    //               animation:true,
    //               text: 'BBYE SEE YOU BUKAS HAHAHAH',
    //             })
    //             this.$socket.emit("newUpdate", { updateType: "GetDetailsData" });
    //         });



    
      },

      
    },
    beforeDestroy() {
    // Clean up event listener if needed
    window.removeEventListener('devtoolschange', this.handleDevToolsChange)
  },
};
</script>
<style scoped>
.topbar{
    display:block;
    width:100%;
    height:300px;
    overflow:scroll;
    }
    .topbar2{
        display:block;
        width:100%;
        height:650px;
        overflow:scroll;
        }
.v-data-table-header th {
    white-space: nowrap;
  }

  #timedetails1 {
    text-align: right;
    width: auto;
    height: auto; 
    padding: 10px;
  }
  #timedetails2 {
    width: auto;
    height: auto; 
    padding: 10px; 
  }

  #rcorners1 {
    text-align: right;
    border-radius: 25px;
    background: #73AD21;
    padding: 10px; 
    padding-left: 50px;
    width: auto;
    height: auto;
    font-weight: bold;  
    margin-left:180px;
  }

  #rcorners2 {
    border-radius: 25px;
    background: #78cde2;
    padding: 10px; 
    width: auto;
    height: auto;
    font-weight: bold;  
    margin-right:130px;
  }
</style>>

