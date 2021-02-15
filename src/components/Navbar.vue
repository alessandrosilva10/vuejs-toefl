
<template>
    <nav>
        <v-app-bar flat app>
            <v-app-bar-nav-icon class="grey--text" @click="drawer = !drawer"></v-app-bar-nav-icon>
            <v-toolbar-title class="text-uppercase grey--text">
                <span class="font-weight-light">TOEFL</span>
                <span>Made Easy</span>
            </v-toolbar-title>
            <v-spacer></v-spacer>
        <v-btn text color="grey">
                <span>{{username}}</span>
            </v-btn>
            <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>
        <v-menu
            left
            bottom
        >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            icon
            v-bind="attrs"
            v-on="on"
          >
            <v-icon>mdi-cog-outline</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item>
            <v-list-item-title>
            <v-btn text color="grey">
                <v-icon left>mdi-account-cog-outline</v-icon>
                <span @click="profile()">Profile</span>
            </v-btn>
            </v-list-item-title>
          </v-list-item>
           <v-list-item>
            <v-list-item-title>
            <v-btn text color="grey">
                <v-icon left>mdi-eyedropper-minus</v-icon>
                <span @click="scoreboard()">Scoreboard</span>
            </v-btn>
            </v-list-item-title>
          </v-list-item>
            <v-list-item>
            <v-list-item-title>
                <v-btn text color="grey">
                    <v-icon left>mdi-exit-to-app</v-icon>
                    <span @click="signOut()">Sign Out</span>
                </v-btn>
            </v-list-item-title>
          </v-list-item>
        </v-list>

      </v-menu>
        </v-app-bar>
        <v-navigation-drawer v-model="drawer" app class="blue">
             <v-list style="padding-top: 62px">
                <v-list-item v-for="link in links_toefl" :key="link.text" router :to="link.route">
                    <v-list-item-action>
                        <v-icon class="white--text">{{ link.icon }}</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title class="white--text">{{ link.text }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
            <v-list style="padding-top: 20px">
                <v-list-item v-for="link in links" :key="link.text" router :to="link.route">
                    <v-list-item-action>
                        <v-icon class="white--text">{{ link.icon }}</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title class="white--text">{{ link.text }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
    </nav>
</template>
<script>
import VueCookies from 'vue-cookies'
export default {
    data(){
        return {
            drawer: true,
            username: VueCookies.get('TOEFLMADEEASY').name,
            links_toefl: [
                { icon: 'mdi-view-dashboard', text: 'TOEFL Practice'},
                { icon: 'mdi-book', text: 'Reading Practice', route: '/reading' },
                { icon: 'mdi-file-music', text: 'Listening Practice', route: '/toefl' },
            ]
            ,links: [
                { icon: 'mdi-view-dashboard', text: 'Dashboard', route: '/' },
               // { icon: 'mdi-book', text: 'Reading Practice', route: '/reading' },
               // { icon: 'mdi-account', text: 'Team', route: '/team' },
              //  { icon: 'mdi-file-music', text: 'TOEFL Listening', route: '/toefl' },
                { icon: 'mdi-file-music', text: '1800 Essential Words', route: '/1800' },
                { icon: 'mdi-youtube', text: 'Import from YouTube', route: '/import' },
                { icon: 'mdi-youtube', text: 'Study', route: '/index' ,
                    subLinks: [
                        { text: "Add Driver", route: "/drivers/add" },
                        { text: "Add Driver", route: "/drivers/add" },
                    ]},
                { icon: 'mdi-message', text: 'Contact', route: '/contact' },
            ],
        }
    },
    methods: {
        profile(){
            this.$router.push('/profile');
        },
        scoreboard(){
            this.$router.push('/scoreboard');
        },
        signOut(){
            if(VueCookies.get('TOEFLMADEEASY')){
                VueCookies.remove('TOEFLMADEEASY');
                this.$router.push('/login');
                this.$toast.success("You have been signed out successfully!", {
                timeout: 5000
            })}
        }
    }
}
</script>
