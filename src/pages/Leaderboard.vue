<template>
    <h1 class="page-title">League Standings</h1>
    <table >
        <thead>
            <tr>
                <th class="text-left">Team Name</th>
                <th class="text-center">MP</th>
                <th class="text-center">GF</th>
                <th class="text-center sm-none">GA </th>
                <th class="text-center">Points</th>
            </tr>
        </thead>
        <tbody>
            <tr 
                :key="index"
                v-for="(country, index) in leaderboard">
                <td class="bold">
                    <div class="country-item cell-left">
                        <img class="flag" :src="`https://flagsapi.codeaid.io/${country.teamName}.png`">
                        <span class="bold">{{ country.teamName }}</span>
                    </div>
                </td>
                <td class="text-center">
                    {{ country.matchesPlayed }}
                </td>
                <td class="text-center">
                    {{ country.goalsFor }}
                </td>
                <td class="text-center sm-none">
                    {{ country.goalsAgainst }}
                </td>
                <td class="text-center points">
                    {{ country.points }}
                </td>
            </tr>    
        </tbody>
    </table>
</template>
<script setup>

import { ref, onMounted } from 'vue';
import HttpRequest from'../services/HttpRequest';
import LeagueService from'../services/LeagueService';

const leaderboard = ref(null);
const leagueService = new LeagueService();

const setLeaderboardAfterToken = async () => {
    try {
        
        const response = await HttpRequest.get("v1/getAccessToken");
        const {success, access_token} = response.data;
        if (success) {
            localStorage.setItem("authToken", access_token);
            await setLeaderboard();
        }            

    } catch (error) {
        console.log(error);
    }
}

const setLeaderboard = async () => {
    try {

        await leagueService.fetchData();
        leaderboard.value = leagueService.getLeaderboard(); 

    } catch (error) {

        if (error.response.status === 401) {
            setLeaderboardAfterToken();
        }

    }

};

onMounted(() => {
    setLeaderboard(); 
});

</script>

  