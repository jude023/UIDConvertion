<template>
<v-app id="inspire">
   <!-- <v-navigation-drawer 
      v-model="navDrawerVal"
      :color="themeColor == '' ? 'primary' : themeColor"
      :mini-variant.sync="mini"
      clipped
      expand-on-hover
      permanent
      dark
      app
   >  -->
         <!-- <v-list> -->
            <!-- For Non-Japanese -->
            <!-- <v-list-item  class="px-2">
               <v-list-item-avatar>                                       
                     <img :src="`http://hrd-adminweb/photos/NoPic.jpg`" alt="nopic.jpg"> 
               </v-list-item-avatar> -->
               <!-- <v-list-item-content>
                     <v-list-item-title>Sample1</v-list-item-title>
                     <v-list-item-subtitle class="caption">Sample Name</v-list-item-subtitle>
                     <v-list-item-subtitle class="caption">Sample Possition</v-list-item-subtitle>
               </v-list-item-content>
            </v-list-item> -->
         <!-- </v-list>
         <v-divider></v-divider>
         <v-list shaped dense>
               <v-list-item
                  v-for="(item, i) in items"
                  :key="i"
                  :to="item.to"
               > -->
                  <!-- <v-list-item-icon>
                     <v-icon v-text="item.icon"></v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                     <v-list-item-title v-text="item.text"></v-list-item-title>
                  </v-list-item-content>
               </v-list-item>
         </v-list>
      </v-navigation-drawer> -->

      <v-app-bar dense dark :color="themeColor == '' ? 'primary' : themeColor" app clipped-left>
            <v-toolbar-title class="font-weight-bold text-h5" >UID Convertion</v-toolbar-title>
         <v-spacer></v-spacer>
         <v-btn @click="sideDrawer = !sideDrawer" icon>
            <v-icon>mdi-cog-outline</v-icon>
         </v-btn>  
         <!-- <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
               <v-btn @click="logout()" v-bind="attrs" v-on="on" icon>
                  <v-icon >mdi-logout</v-icon>
               </v-btn> 
            </template>
            <span>Logout</span>
         </v-tooltip> -->
      </v-app-bar>
         <v-navigation-drawer
               v-model="sideDrawer"
               :disable-resize-watcher="true"
               hide-overlay
               temporary
               right
               app         
         >
               <v-list dense>
                  <v-list-item>
                        <v-list-item-content>
                              <v-list-item-title>Settings</v-list-item-title>
                        </v-list-item-content>
                        <v-list-item-action>
                              <v-tooltip bottom>
                                 <template v-slot:activator="{ on, attrs }">
                                       <v-btn @click="gotoHelp()" v-on="on" v-bind="attrs" icon>
                                             <v-icon >mdi-help-circle-outline</v-icon>
                                       </v-btn>
                                 </template>
                                 <span>Help</span>
                              </v-tooltip>
                        </v-list-item-action>
                  </v-list-item>
                  <v-divider></v-divider>
                  <v-list-item>
                        <v-list-item-content>
                              <v-subheader>Theme Color</v-subheader>
                              <v-color-picker 
                                 v-model="themeColorVal"
                                 mode="hexa" 
                                 hide-mode-switch 
                                 hide-canvas
                                 :show-swatches="swatches"
                                 :update:color="changeThemeColor(themeColorVal)"
                              ></v-color-picker>
                        </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                        <v-list-item-content>
                        <v-btn x-small block text @click="swatches = !swatches" :color="themeColor == '' ? 'primary' : themeColor">
                              {{swatches == false ? "Show more" : "Hide"}}
                        </v-btn>
                        </v-list-item-content>
                  </v-list-item>
                  <v-divider class="mx-3"></v-divider>
                  <v-list-item>
                        <!-- <v-list-item-content>
                              <v-subheader>Profile Background</v-subheader>
                              <v-item-group mandatory>
                                 <v-row>
                                       <v-col v-for="(item, i) in profileImage" :key="i" cols="12" md="4">
                                             <v-item v-slot="{ toggle }">
                                                <v-card 
                                                      elevation="7"
                                                      :style="item.value == profileBackground ? `border: 2px solid ${themeColor} !important;` : ''"
                                                      @click="toggle" 
                                                >
                                                      <v-img @click="changeProfileBackground(item.value)" :src="item.value"></v-img>
                                                </v-card>
                                             </v-item>
                                       </v-col>
                                 </v-row>
                              </v-item-group>
                        </v-list-item-content> -->
                  </v-list-item>
                  <v-divider class="mx-3"></v-divider>
                  <v-list-item>
                        <v-list-item-content>
                              <v-list-item-subtitle>Dark Mode <v-icon>{{icon}}</v-icon></v-list-item-subtitle>
                        </v-list-item-content>
                        <v-list-item-action>
                              <v-switch
                                 v-model="dark"        
                                 @change="changeTheme()"
                                 inset
                              ></v-switch>
                        </v-list-item-action>
                  </v-list-item>
               </v-list>
         </v-navigation-drawer>

      <v-main class="ma-2">
         <router-view></router-view>
      </v-main>
   </v-app>
</template>

<script>
   export default {
      data: () => ({
      swatches: false,
         navDrawerVal: false,
         dark: false,
         overlay: false,
         sideDrawer: false,
         isConnected: false,
         icon: 'mdi-weather-night',
         themeColorVal: '',
         navDrawerList: [],
         navDrawerSubGroup: [],
         drawer: null,
         mini: true,
         items:[
            {text:'MainPage', icon:'mdi-home', to:'MainPage'},
         ]
      }),

      created(){
      this.dark = this.darkMode
      this.user = this.userInfo
      this.themeColorVal = this.themeColor
      this.navDrawerVal = this.$vuetify.breakpoint.smAndDown ? false : true
   },

   methods:{
      changeTheme() {
         this.$vuetify.theme.dark = this.dark
         this.icon = this.dark ? 'mdi-weather-night' : 'mdi-weather-sunny'
         this.$store.commit('CHANGE_THEME', this.dark)
      },
      changeThemeColor(val) {
         this.$store.commit('CHANGE_THEMECOLOR', val)
      },
      changeProfileBackground(val) {
         this.$store.commit('CHANGE_PROFILE_BACKGROUND', val)
      },
      logout(){
         //add Function for logout here
         alert('add Function for logout here')
      },
   },
   watch:{
      dark() {
         this.changeTheme()
   },
   }
   }
</script>