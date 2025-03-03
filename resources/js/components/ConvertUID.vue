<template>
    <v-container>
        <v-app>
            <template>
                <v-card>
                <v-toolbar dark flat :color="themeColor == '' ? 'primary' : themeColor">
                <template >
                    <v-tabs v-model="tabs" centered grow >
                    <v-tab dark grow :style="themeColor == '' ? 'background-color: rgb(25, 118, 210); color:white' : themeColor "  @click="resetForm()">
                        Convertion
                    </v-tab>

                    <v-tab dark grow :style="themeColor == '' ? 'background-color: rgb(25, 118, 210); color:white' : themeColor "  @click="resetForm()">
                        Multiple Convertion
                    </v-tab>
                    </v-tabs>
                </template>
                </v-toolbar>
                
                    <v-tabs-items v-model="tabs">
                        <v-tab-item>
                            <v-card flat>
                                <v-card-text>
                                    <div class="banner-center-box text-white text-center">
                                        <h2>
                                            Convert UID to Contact Number
                                        </h2>
                                        <div class="description" id="result">
                                            You want to get some Contact Number, you worry about not finding other Contact Number? Let me find that Number through UID.
                                        </div>
                                        <div class="cta-subscribe cta-subscribe-3 box-form">
                                            <div class="box-content">
                                                <div class="cs-notifications">
                                                    <div class="cs-notifications-content"></div>
                                                </div><!-- .cs-notifications end -->
                                                <div id="form-cta-subscribe-2" class="form-inline col-md-12">
                                                    <v-form ref="Convertion">
                                                        <div >
                                                            <v-row> 
                                                                <v-col cols="12">
                                                                    <v-text-field 
                                                                        outlined 
                                                                        dense flat 
                                                                        :color="themeColor == '' ? 'primary' : themeColor" 
                                                                        v-model="UID" 
                                                                        @keypress="onlyNumber"
                                                                        :rules="rules.required"
                                                                        ></v-text-field>
                                                                    <span v-if="Result != ''">IsActive: {{ Result.isvalid == false ? 'NO DATA' : Result.isvalid }}  / {{international}}</span>
                                                                    <!-- {{ international }} -->
                                                                    <span v-else>No Data</span>
                                                                </v-col>
                                                                
                                                            </v-row>
                                                        </div><!-- .form-group end -->
                                                    </v-form>
                                                    <div>
                                                        <!-- <input type="submit" class="form-control" value="Send request" onclick="change();"> -->
                                                        <v-row>
                                                            <v-col cols="12">
                                                                <v-btn dark rounded block :color="themeColor == '' ? 'primary' : themeColor" @click="SingleConvertion(UID)"> Convertion</v-btn>
                                                            </v-col>
                                                        </v-row>
                                                    </div><!-- .form-group end -->
                                                </div><!-- #form-cta-subscribe-2 end -->
                                            </div><!-- .box-content end -->
                                        </div><!-- .box-form end -->
                                    </div><!-- .banner-center-box end -->
                                </v-card-text>
                            </v-card>
                        </v-tab-item>
                        <v-tab-item>
                            <!-- 2 -->
                            <v-card flat>
                                <v-card-text>
                                    <div class="banner-center-box text-white text-center">
                                        <h2>
                                            Convert UID to Contact Number
                                        </h2>
                                        <div class="description" id="result">
                                            You want to get some Contact Number, you worry about not finding other Contact Number? Let me find that Number through UID.
                                        </div>
                                        <div class="cta-subscribe cta-subscribe-3 box-form">
                                            <div class="box-content">
                                                <div class="cs-notifications">
                                                    <div class="cs-notifications-content"></div>
                                                </div><!-- .cs-notifications end -->
                                                <div id="form-cta-subscribe-2" cl   ass="form-inline col-md-12">
                                                    <div >
                                                        <v-row>
                                                            <v-col cols="12">
                                                                <v-form ref="Multi">
                                                                    <v-file-input
                                                                    placeholder="Select your files"
                                                                    prepend-icon="mdi-paperclip"
                                                                    variant="outlined"
                                                                    accept=".csv"
                                                                    label="File input"
                                                                    show-size
                                                                    truncate-length="12"
                                                                    v-model="files"
                                                                    @change="handleChange"
                                                                ></v-file-input>
                                                                </v-form>
                                                                
                                                                <!-- <span v-if="Result != ''">IsActive: {{ Result.valid }} / {{international}}</span>
                                                                <span v-else>No Data</span> -->
                                                            </v-col>
                                                            
                                                        </v-row>
                                                    </div><!-- .form-group end -->
                                                    <div>
                                                        <!-- <input type="submit" class="form-control" value="Send request" onclick="change();"> -->
                                                        <v-row>
                                                            <v-col cols="12">
                                                                <strong>{{textInfo}}</strong>
                                                                <v-btn dark rounded block :disabled="isdisable" :color="themeColor == '' ? 'primary' : themeColor" @click="MultiConvert()"> Convertion</v-btn>
                                                            </v-col>
                                                        </v-row>
                                                    </div><!-- .form-group end -->
                                                </div><!-- #form-cta-subscribe-2 end -->
                                            </div><!-- .box-content end -->
                                        </div><!-- .box-form end -->
                                    </div><!-- .banner-center-box end -->
                                </v-card-text>
                            </v-card>
                        </v-tab-item>
                        <v-tab-item>
                            <!-- 3 -->
                        </v-tab-item>
                    </v-tabs-items>
                </v-card>   
            </template>
            <template>
                <div style="min-height: 4px;">
                    <v-progress-linear
                        dark
                        background-color="primary lighten-2"
                        color="primary"
                        height="25"
                        v-model="value"
                        :active="show"  
                    >
                    <template v-slot:default="{ value }">
                        <strong>{{ Math.ceil(value) }}%</strong>
                    </template>
                </v-progress-linear>
                </div>
              </template>
             <!-- NOTE PROGRESS CIRCULAR ----------------------->
            <v-overlay :value="overlay">
                <v-progress-circular
                color="white"
                indeterminate
                :size="150"
                ></v-progress-circular>
            </v-overlay>
            <!-- NOTE PROGRESS CIRCULAR ----------------------->
        </v-app>
    </v-container>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import areaCode from '../areaCode.json'
import {parsePhoneNumber, getExampleNumber } from 'libphonenumber-js'
import devtools  from "devtools-detect";
var reader = new FileReader();
export default {
    data : () =>({
        isDevToolsOpen  :    false,
        tabs            :    null,
        UID             :    undefined,
        Result          :    '',
        international   :    '',
        overlay         : false,

        USPreFix        :   [212, 315, 347, 516, 607, 631, 646, 718, 845, 917, 929,
                            339, 351, 413, 508, 617, 774, 781, 857, 978,
                            215, 267, 412, 484, 570, 610, 717, 814, 878,
                            201, 551, 609, 732, 848, 856, 862, 908,
                            203, 475, 860, 959,
                            217, 309, 312, 331, 618, 630, 708, 773, 815, 872,
                            231, 248, 269, 313, 517, 586, 616, 734, 810, 906,
                        	216, 234, 330, 419, 440, 513, 567, 614, 740, 937,
                            219, 260, 317, 463, 574, 765, 812, 930,
                            262, 414, 534, 608, 715, 920,
                            314, 417, 573, 636, 660, 816,
                            239, 305, 321, 352, 386, 407, 561, 727, 754, 786, 813, 850, 904, 941, 954,
                            210, 214, 254, 281, 325, 361, 409, 430, 512, 682, 713, 726, 737, 806, 817, 830, 903, 915, 936, 940, 956, 972, 979,
                            229, 404, 470, 478, 678, 706, 762, 770, 912,
                            252, 336, 704, 743, 828, 910, 919, 984,
                            276, 434, 540, 571, 703, 757, 804,
                            423, 615, 629, 731, 865, 901, 931,
                            209, 213, 310, 323, 408, 415, 424, 442, 530, 559, 562, 619, 626, 628, 650, 657, 661, 669, 707, 714, 747, 760, 805, 818, 831, 858, 909, 916, 925, 949, 951,
                            480, 520, 602, 623, 928,
                            702, 725,
                            206, 253, 360, 425, 509,
                        	458, 503, 541, 971,
                            303, 719, 720, 970,808,907,
                        	218, 320, 507, 612, 651, 763, 952,
                            316, 620, 785, 913,
                        	308, 402, 531,
                            405, 539, 580, 918,
                            319, 515, 563, 641, 712],
    csvData                 :[],
    files                   :[],
    examplesCache           :null,
    randomNumber            : null,
    value                   : 0,
    query                   : false,
    show                    : false,
    interval                : 0,
    isdisable               : false,
    textInfo                : '',
    }),

    created(){
        // this.queryAndIndeterminate()
        //  this.isDevToolsOpen = devtools.isOpen
 
        // // Listen for changes
        // window.addEventListener('devtoolschange', event => {
        // this.isDevToolsOpen = event.detail.isOpen
        // })
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
    },

    computed: {
      ...mapState([
        'rules'
      ])
    },

    beforeDestroy () {
      clearInterval(this.interval)
      window.removeEventListener('devtoolschange', this.handleDevToolsChange)
    },

    methods:{
        resetForm(){
            if(this.$refs.Convertion){
                this.$refs.Convertion.reset();
            }

            if(this.$refs.Multi){
                // this.$refs.Multi.reset();
                this.files = []
            }
        },


        async getCachedExamples() {
        if (!this.examplesCache) {
            const response = await fetch(
                'https://unpkg.com/libphonenumber-js@1.9.6/examples.mobile.json'
            );
            this.examplesCache = await response.json();
        }
        return this.examplesCache;
        },

        async generateRandomPhoneNumber(countryCode = param) {
        const examples = await this.getCachedExamples();
        this.randomNumber = getExampleNumber(countryCode, examples);
        // console.log(this.randomNumber)
        // return randomNumber
        },

        onlyNumber($event) {
            console.log($event)
            let keyCode = $event.keyCode ? $event.keyCode : $event.which;
            if (keyCode < 48 || keyCode > 57) {
                // 46 is dot
                $event.preventDefault();
            }
        }, //END FOR ONLY NUMBER FUNCTION

        async SingleConvertion(item) {
            console.log('start',item)
            this.overlay = true
            if(item.length >= 10){
                
                console.log('true') 
                try {
                this.Result = [];
                this.international = ''
                this.UID = item;
                if(this.PrevID == this.UID){
                    this.international = this.PrevNo
                    this.Result = {'valid':this.PrevStatus}
                    this.international = ''
                    console.log(this.Result)
                }else{
                    
                    if (this.UID.length >= 17) {
                        await this.processUnitedStates();
                    } else if (this.UID.substr(0, 5) === "61555") {
                        await this.processThailand();
                    } else if (this.UID.substr(0, 5) === "61558") {
                        await this.processPakistan();
                    } else if (this.UID.substr(0, 4) === "6156") {
                        await this.processBangladeshBahrain();
                    } else if (this.UID.substr(0, 4) === "1000") {
                        await this.processOtherCountries();
                    }else{
                        await this.OtherPhoneGen()
                    }

                }
                
                } catch (error) {
                    console.error('Error in SingleConvertion:', error);
                    this.Result = [];
                    this.international = ''
                    
                    throw error;
                }
                this.overlay = false 
            }else{
                this.overlay = false
                let data = {
                    number: 'NOT A VALID  PHONE OR UID',
                    isvalid: false
                }
                axios.post(`api/ToNotepad`, data)
                // if (phoneNumber) {
                //     // return response.data;
                //     return phoneNumber
                // }
            }
        },

        async processNumber(number) {
            console.log('number',number)
            const result = await this.checker(number);
            console.log('result',result)
            this.Result = result;
            this.international = result.number;
            this.$store.commit("STORE_OLD_DATA_ID", this.UID);
            this.$store.commit("STORE_OLD_DATA_NO", this.international);
            this.$store.commit("STORE_OLD_DATA_STATUS", this.Result.isvalid);
        },

        async OtherPhoneGen(){
            const randomIndex = Math.floor(Math.random() * areaCode.length);
            console.log(areaCode[randomIndex].code)
            await this.generateRandomPhoneNumber(areaCode[randomIndex].code)
            console.log( 'random',this.randomNumber)
            console.log(this.randomNumber.nationalNumber.length)

            const digitHandlers = {
                6: () => this.generateSixDigitNumber(),
                7: () => this.generateSevenDigitNumber(),
                8: () => this.generateEightDigitNumber(),
                9: () => this.generateNineDigitNumber(),
                10: () => this.generateTenDigitNumber(),
                11: () => this.generateElevenDigitNumber()
            };

            switch(this.randomNumber.nationalNumber.length)
            {
                case 11 :
                const number11 = '+' + this.randomNumber.countryCallingCode + 
                digitHandlers[this.randomNumber.nationalNumber.length]();
                console.log(`other ${this.randomNumber.nationalNumber.length}`, number11);
                await this.processNumber(number11);
                break;

                case 10 :
                const number10 = '+' + this.randomNumber.countryCallingCode + 
                digitHandlers[this.randomNumber.nationalNumber.length]();
                console.log(`other ${this.randomNumber.nationalNumber.length}`, number10);
                await this.processNumber(number10);
                break;

                case 9 :
                const number9 = '+' + this.randomNumber.countryCallingCode + 
                digitHandlers[this.randomNumber.nationalNumber.length]();
                console.log(`other ${this.randomNumber.nationalNumber.length}`, number9);
                await this.processNumber(number9);
                break;

                case 8 :
                const number8 = '+' + this.randomNumber.countryCallingCode + 
                digitHandlers[this.randomNumber.nationalNumber.length]();
                console.log(`other ${this.randomNumber.nationalNumber.length}`, number8);
                await this.processNumber(number8);
                break;

                case 7 :
                const number7 = '+' + this.randomNumber.countryCallingCode + 
                digitHandlers[this.randomNumber.nationalNumber.length]();
                console.log(`other ${this.randomNumber.nationalNumber.length}`, number7);
                await this.processNumber(number7);
                break;

                case 6 :
                const number6 = '+' + this.randomNumber.countryCallingCode + 
                digitHandlers[this.randomNumber.nationalNumber.length]();
                console.log(`other ${this.randomNumber.nationalNumber.length}`, number6);
                await this.processNumber(number6);
                break;
            }

            
        },

        async getRandomDialCode(data) {
            if (!Array.isArray(data) || data.length === 0) {
                return null;
            }
            const randomIndex = Math.floor(Math.random() * data.length);
            // return data[randomIndex].dial_code;
            console.log(data[randomIndex].dial_code)
        },

        async processUnitedStates() {
            for (let x = 0; x < areaCode.length; x++) {
                if (areaCode[x].name === "United States") {
                const number = areaCode[x].dial_code + 
                                this.getUSPrefixCode() + 
                                this.generateSevenDigitNumber();
                console.log('us',number)    
                const result = await this.checker(number);
                this.Result = result;
                this.international = result.number
                this.$store.commit("STORE_OLD_DATA_ID", this.UID)
                this.$store.commit("STORE_OLD_DATA_NO", this.international)
                this.$store.commit("STORE_OLD_DATA_STATUS", this.Result.isvalid)
                break;
                }
            }
        },  

        async processThailand() {
            for (let x = 0; x < areaCode.length; x++) {
                if (areaCode[x].name === "Thailand") {
                const number = areaCode[x].dial_code + 
                                this.getThaiCode() + 
                                this.generateEightDigitNumber();
                console.log('thai',number)
                const result = await this.checker(number);
                this.Result = result;
                this.international = result.number
                this.$store.commit("STORE_OLD_DATA_ID", this.UID)
                this.$store.commit("STORE_OLD_DATA_NO", this.international)
                this.$store.commit("STORE_OLD_DATA_STATUS", this.Result.isvalid)
                break;
                }
            }
        },

        async processPakistan() {
            for (let x = 0; x < areaCode.length; x++) {
                if (areaCode[x].name === "Pakistan") {
                const number = areaCode[x].dial_code + 
                                this.generateFix3() +
                                this.generateSevenDigitNumber();
                console.log('pakis',number)
                const result = await this.checker(number);
                this.Result = result;
                this.international = result.number
                this.$store.commit("STORE_OLD_DATA_ID", this.UID)
                this.$store.commit("STORE_OLD_DATA_NO", this.international)
                this.$store.commit("STORE_OLD_DATA_STATUS", this.Result.isvalid)
                break;
                }
            }
        },

        async processBangladeshBahrain() {
            const areacode = this.generateRandomAreaCode_2()
            if(areacode == +880){
                const number = '+880' + 
                                this.getBangCode() +
                                this.generateEightDigitNumber();
                console.log('bang',number)
                const result = await this.checker(number);
                this.Result = result;
                this.international = result.number
                this.$store.commit("STORE_OLD_DATA_ID", this.UID)
                this.$store.commit("STORE_OLD_DATA_NO", this.international)
                this.$store.commit("STORE_OLD_DATA_STATUS", this.Result.isvalid)

            }else if(areacode == +9733){
                const number = '+9733' + 
                                this.generateEightDigitNumber()
                console.log('baha',number)
                const result = await this.checker(number);
                this.Result = result;
                this.international = result.number
                this.$store.commit("STORE_OLD_DATA_ID", this.UID)
                this.$store.commit("STORE_OLD_DATA_NO", this.international)
                this.$store.commit("STORE_OLD_DATA_STATUS", this.Result.isvalid)
            }
        },

        async processOtherCountries(){
            const areacode = this.generateRandomAreaCode()
            if(areacode == +63){
                const number = '+639' + 
                                this.generateTwoDigitNumber() +
                                this.generateSevenDigitNumber();
                const result = await this.checker(number);
                console.log('ph',result)
                this.Result = result;
                this.international = result.number
                this.$store.commit("STORE_OLD_DATA_ID", this.UID)
                this.$store.commit("STORE_OLD_DATA_NO", this.international)
                this.$store.commit("STORE_OLD_DATA_STATUS", this.Result.isvalid)

            }else if(areacode == +93){
                const number = '+93' + 
                                this.generate70To79() +
                                this.generateSevenDigitNumber()
                console.log('before',number)
                const result = await this.checker(number);
                console.log('"Afghanistan"',result)
                this.Result = result;
                this.international = result.number
                this.$store.commit("STORE_OLD_DATA_ID", this.UID)
                this.$store.commit("STORE_OLD_DATA_NO", this.international)
                this.$store.commit("STORE_OLD_DATA_STATUS", this.Result.isvalid)

            }else if(areacode == +994){
                const number = '+994' + 
                                this.generateRandomCountryCode() + 
                                this.generateSevenDigitNumber()
                const result = await this.checker(number);
                console.log('ph"Azerbaijan"',result)
                this.Result = result;
                this.international = result.number
                this.$store.commit("STORE_OLD_DATA_ID", this.UID)
                this.$store.commit("STORE_OLD_DATA_NO", this.international)
                this.$store.commit("STORE_OLD_DATA_STATUS", this.Result.isvalid)

            }else if(areacode == +91){
                const number = '+91' + 
                                this.getIndiaPrefixCode() +     
                                this.generateNineDigitNumber()
                const result = await this.checker(number);
                console.log('"India"',result)
                this.Result = result;
                this.international = result.number
                this.$store.commit("STORE_OLD_DATA_ID", this.UID)
                this.$store.commit("STORE_OLD_DATA_NO", this.international)
                this.$store.commit("STORE_OLD_DATA_STATUS", this.Result.isvalid)
            }
        },  
        async checker(number) {
            try{
                // V1
                console.log(number)
                const phoneNumber = parsePhoneNumber(number)
                console.log(phoneNumber)
                phoneNumber.isvalid = phoneNumber.isValid();
                phoneNumber.posible = phoneNumber.isPossible();
                // console.log(phoneNumber)
                axios.post(`api/ToNotepad`, phoneNumber)
                    if(phoneNumber) {
                    // return response.data;
                    return phoneNumber
                    }
                
                

                // const isValid = phoneNumber.isValid()
                // response.isTrue = isValid
                // response = {...phoneNumber}
                // console.log(response)
            // return new Promise((resolve,reject)=>{
                // const url = `https://phonevalidation.abstractapi.com/v1/?api_key=1f8f89fc493148af86fde7fce04f111d&phone=${conNumber}`;
                // const response = await axios.get(url);
                // console.log('res',response.data)
               
                
                // throw new Error('No valid data returned from API');
            }catch (error){
                
                // if(error.name == 'Error'){
                //     // V2
                //     try{
                //         const conNumber = number.slice(1);
                //         const url = `https://phonevalidation.abstractapi.com/v1/?api_key=daf92285ec9940188908f9d29bf3dc8e&phone=${conNumber}`;
                //         const response = await axios.get(url);
                //         console.log('res',response.data)
                //         axios.post(`api/ToNotepad`, response.data)
                //         if (response.data) {
                //             return response.data;
                //         }
                        
                //         throw new Error('No valid data returned from API');
                //     }catch(error){
                //         // V3
                //         try{
                //             if(error.name == 'Error'){
                //                 const conNumber = number.slice(1);
                //                 const url = `https://phonevalidation.abstractapi.com/v1/?api_key=fc9198f212ff4d8db4be34d656c52dc3&phone=${conNumber}`;
                //                 const response = await axios.get(url);
                //                 console.log('res',response.data)
                //                 axios.post(`api/ToNotepad`, response.data)
                //                 if (response.data) {
                //                     return response.data;
                //                 }
                                
                //                 throw new Error('No valid data returned from API');
                //             }
                //         }catch(error){

                //         }
                //         // console.log('Error in Checker:' , error.name == 'Error' );
                //     }
                // }

                // console.log('Error in Checker:' , error.name == 'Error' );
                // console.log(error.substr(0,5))
                // throw error;
                
            }
        },

        
            //     try {
            //     const finalresult = await Promise.all(CheckResult);
            //     if(finalresult.length === 0){
            //         console.log('All validations complete:', this.Result);   
            //         this.UID = ''
            //     }else{
            //            // alert('1')
            //         this.Result = finalresult[0]
            //         this.international = finalresult[0].format.international
            //         console.log('All validations complete:', this.Result);
            //         this.UID = ''
                    
            //     }
                
            // } catch(error) {
            //     console.error('Error in validation:', error);
            // }

        generate70To79() {
            return Math.floor(Math.random() * 10) + 70;
            // console.log(Math.floor(Math.random() * 10) + 70)
        },

        getUSPrefixCode(){
            const numbers = this.USPreFix
            return numbers[Math.floor(Math.random() * numbers.length)];
        },

        generateRandomAreaCode() {
            const AreaCode = ['+63', '+93', '+994', '+91'];
            const randomIndex = Math.floor(Math.random() * AreaCode.length);
            return AreaCode[randomIndex];
        },

        generateRandomAreaCode_2() {
            const AreaCode = ['+880','+9733'];
            const randomIndex = Math.floor(Math.random() * AreaCode.length);
            return AreaCode[randomIndex];
        },

        generateRandomCountryCode() {
            const CountryCode = ['12', '22', '24', '18','25','24','14','20','23'];
            const randomIndex = Math.floor(Math.random() * CountryCode.length);
            return CountryCode[randomIndex];
        },

        generateTwoDigitNumber() {
            const randomNum = Math.floor(Math.random() * 9) + 1;
            // console.log(randomNum.toString().padStart(2, '0'))
            return randomNum.toString().padStart(2, '0');
        },

        getIndiaPrefixCode() {
            const numbers = [7,8,9];
            return numbers[Math.floor(Math.random() * numbers.length)];
        },

        getThaiCode() {
            const numbers = [8, 9, 6];
            return numbers[Math.floor(Math.random() * numbers.length)];
        },

        getBangCode() {
            const numbers = [11,15,16,18,17,13,19,10,12,14];
            return numbers[Math.floor(Math.random() * numbers.length)];
        },

        generateElevenDigitNumber(){
            const min = 10000000000; // Smallest 11-digit number
            const max = 99999999999; // Largest 11-digit number
            
            return  Math.floor(Math.random() * (max - min + 1)) + min
        },

        generateTenDigitNumber(){
            const min = 1000000000; // Smallest 10-digit number
            const max = 9999999999; // Largest 10-digit number
            
            return  Math.floor(Math.random() * (max - min + 1)) + min
        },

        generateNineDigitNumber(){
            const min = 100000000; // Smallest 9-digit number
            const max = 999999999; // Largest 9-digit number
            
            return  Math.floor(Math.random() * (max - min + 1)) + min
        },

        generateEightDigitNumber(){
            const min = 10000000; // Smallest 8-digit number
            const max = 99999999; // Largest 8-digit number
            
            return  Math.floor(Math.random() * (max - min + 1)) + min
        },
        generateSevenDigitNumber(){
            const min = 1000000; // Smallest 7-digit number
            const max = 9999999; // Largest 7-digit number
            return  Math.floor(Math.random() * (max - min + 1)) + min
            // console.log( Math.floor(Math.random() * (max - min + 1)) + min) 
        },
        
        generateSixDigitNumber(){
            const min = 100000; // Smallest 6-digit number
            const max = 999999; // Largest 6-digit number
            return  Math.floor(Math.random() * (max - min + 1)) + min
            // console.log( Math.floor(Math.random() * (max - min + 1)) + min) 
        },

        generateFix3(){
             // First digit: Random between 0-9, might be empty
            const firstDigit = Math.random() < 0.5 ? '' : Math.floor(Math.random() * 10);
            
            // Second digit: Random between 0-6
            const secondDigit = Math.floor(Math.random() * 7);
            
            // Third digit: Random between 0-9
            const thirdDigit = Math.floor(Math.random() * 10);
            
            // Combine digits, handling empty first digit case
            return `${firstDigit}${secondDigit}${thirdDigit}`.replace(/(^0+)/, '')
        },

        // async checker(item) {
        //     console.log(item)
        //     try {
        //         const conNumber = item.slice(1);
        //         console.log(conNumber)
        //         const url = `https://phonevalidation.abstractapi.com/v1/?api_key=1f8f89fc493148af86fde7fce04f111d&phone=${conNumber}`;
                
        //         const response = await axios.get(url);
        //         const isValid = response.data.valid;
                
        //         console.log(`Validation result: ${isValid}`);
        //         return response.data;
        //     } catch(error) {
        //         console.error('Validation failed:', error);
        //         throw error;
        //     }
        // },

        async handleChange(e) {
            console.log('handlerz',e.target)
            this.csvData = [];
            let csv = e;
            reader.readAsText(csv, "Shift-JIS");
            const result = [];
            reader.onload = function (e) {
                this.csvtext = e.target.result;
                console.log(this.csvtext)
                const lines = this.csvtext.split("\n");
                const headers = lines[0].split(",");
                for (let i = 1; i < lines.length; i++) {
                if (!lines[i]) continue;
                const obj = {};

                const currentline = lines[i].split(",");

                for (let j = 0; j < headers.length; j++) {
                    obj[headers[j].replace("\r", "")] = currentline[j];
                }
                result.push(obj);
                }
                return result;
            };
            this.csvData = result;
            console.log('csv',this.csvData.length)
        },

        async MultiConvert() {
            this.query = true;
            this.show = true;
            this.value = 0;
            this.isdisable = true;
            
            const totalItems = this.csvData.length;
            this.textInfo = '';
            
            // Calculate progress based on actual total items
            const progressPerItem = 100 / totalItems;
            
            console.log('Progress per item:', progressPerItem, this.csvData);
            
            for(let i = 0; i < totalItems; i++) {
                console.log('Processing item', i + 1, 'of', totalItems);
                
                let result = await this.SingleConvertion(this.csvData[i].UID);
                console.log('Conversion result:', result);
                
                // Update progress
                console.log(i)
                this.value += progressPerItem;
                
                // Ensure progress stays within bounds
                this.value = Math.min(100, Math.max(0, this.value));
                
                console.log('Current progress:', this.value);
                
                // Add delay
                await new Promise(resolve => setTimeout(resolve, 3000));
                
                // Check completion
                if (this.value === 100 || i === totalItems - 1) {
                    this.show = false;
                    this.isdisable = false;
                    this.files = [];
                    this.textInfo = 'Conversion is done, Check the Drive:C Folder Name ConvertedToContracts to view the result';
                }
            }
        },

        // queryAndIndeterminate (item) {
        //     this.query = true
        //     this.show = true
        //     this.value = 0

        //     setTimeout(() => {
        //         this.query = false
        //         this.interval = setInterval(() => {
                    
        //             if (this.value === item) {
        //                 console.log(this.value)
        //             clearInterval(this.interval)
        //             this.show = false
        //             // return setTimeout(this.queryAndIndeterminate, 2000)
        //             }
        //             this.value += 1
        //         }, 1000)
        //     }, 1000)
        // },

    }
}
</script>

<style>

</style>