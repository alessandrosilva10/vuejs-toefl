
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
                <span>Sign Out</span>
                <v-icon right>mdi-exit-to-app</v-icon>
            </v-btn>
        </v-app-bar>
        <v-navigation-drawer v-model="drawer" app class="blue">
            <v-list>
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
export default {
    data(){
        return {
            drawer: true,
            links: [
                { icon: 'mdi-view-dashboard', text: 'Dashboard', route: '/' },
                { icon: 'mdi-book', text: 'Reading Practice', route: '/toefl/reading' },
                { icon: 'mdi-account', text: 'Team', route: '/team' },
                { icon: 'mdi-file-music', text: 'TOEFL Listening', route: '/toefl' },
                { icon: 'mdi-file-music', text: '1800 Essential Words', route: '/1800' },
                { icon: 'mdi-youtube', text: 'Import from YouTube', route: '/import' },
                { icon: 'mdi-youtube', text: 'Study', route: '/index' ,
                    subLinks: [
                        { text: "Add Driver", route: "/drivers/add" },
                        { text: "Add Driver", route: "/drivers/add" }
                    ]},
            ],
        }
    }
}
</script>
