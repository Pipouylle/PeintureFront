<script lang="ts">
import {Vue, Component} from 'vue-facing-decorator';
import {useRouter} from "vue-router";
import {listUserStore} from "@/stores/UserStore";
import {User} from "@/models/types/user";

@Component({})
//TODO : faire marcher les boton bleu
export default class ListUserComponent extends Vue {
   private store = listUserStore();
   private router = useRouter();
   private header = [
      {title: 'Nom Utilisateur', value: 'name'},
      {title: 'Action', value: 'actions', sortable: false, align: 'end'},
   ];

   async mounted() {
      await this.store.load();
   }

   private get listUser() {
      if (this.store.archived && this.store.notArchived) {
         return this.store.listUser.users;
      } else if (this.store.archived && !this.store.notArchived) {
         return this.store.listUser.users.filter(user => user.archive);
      } else if (!this.store.archived && this.store.notArchived) {
         return this.store.listUser.users.filter(user => !user.archive);
      } else {
         return [];
      }

   }

   private async archiveUser(user: User) {
      await this.store.archiveUser(user);
      const userToUpdate = this.store.listUser.users.find(user2 => user2.id === user.id);
      if (userToUpdate) {
         userToUpdate.archive = true;
      }
   };

   private async unArchiveUser(user: User) {
      await this.store.unArchiveUser(user);
      const userToUpdate = this.store.listUser.users.find(user2 => user2.id === user.id);
      if (userToUpdate) {
         userToUpdate.archive = false;
      }
   };

   private async updateUser(user: User) {
      await this.store.updateUser(user);
   };
}
</script>

<template>
   <v-card class="containerList">
      <v-card-title class="d-flex justify-space-between align-center titleList">
         <span> Liste des Users </span>
         <v-spacer></v-spacer>
         <v-text-field
             label="Rechercher"
             density="compact"
             prepend-inner-icon="mdi-magnify"
             v-model="this.store.listUser.filter"
             variant="outlined"
             class="textFilter"
         ></v-text-field>
         <v-spacer></v-spacer>
         <v-btn-group>
            <v-btn @click="this.store.archived = !this.store.archived"
                   :color="this.store.archived ? 'blue' : 'grey'"
                   variant="outlined">
               archivé
            </v-btn>
            <v-btn @click="this.store.notArchived = !this.store.notArchived"
                   :color="this.store.notArchived ? 'blue' : 'grey'"
                   variant="outlined">
               non archivé
            </v-btn>
         </v-btn-group>
         <v-spacer></v-spacer>
         <router-link to="/creer/user" class="ml-auto">
            <v-btn class="bntLink">
               Creer un User
            </v-btn>
         </router-link>
      </v-card-title>
      <v-card-text>
         <v-data-table-virtual
             :headers="this.header"
             :items="listUser"
             v-model:search="this.store.listUser.filter"
             :filter-keys="['name']"
             variant="outlined"
             class="tableList"
             :fixed-header="true"
         >
            <template v-slot:[`item.name`]="{ item }">
               <v-text-field
                   v-model="item.name"
                   variant="outlined"
                   density="comfortable"
               ></v-text-field>
            </template>
            <template v-slot:[`item.actions`]="{ item }">
               <v-icon size="x-large" color="primary" @click="updateUser(item)">mdi-pencil</v-icon>
               <v-icon size="x-large" color="error" @click="archiveUser(item)" v-if="item.archive === false">
                  mdi-archive-arrow-down
               </v-icon>
               <v-icon size="x-large" color="error" @click="unArchiveUser(item)" v-if="item.archive === true">
                  mdi-archive-arrow-up
               </v-icon>
            </template>
         </v-data-table-virtual>
      </v-card-text>
   </v-card>
</template>

<style scoped src="@/assets/styles/list.css">
.blueButton {
   background-color: blue;
   color: white;
}
</style>