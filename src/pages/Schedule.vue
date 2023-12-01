<template>

    <h1 class="page-title">League Schedule</h1>
    <table >
        <thead>
            <tr>
                <th class="text-right sm-none">Date/Time</th>
                <th class="sm-none md-none">Stadium</th>
                <th class="text-right">Home Team</th>
                <th class="text-center"> </th>
                <th>Away Team</th>
            </tr>
        </thead>
        <tbody>
            <tr 
                :key="index"
                v-for="(match, index) in matches">
                <td class="text-right sm-none">
                    {{ formattedDate(match.matchDate) }} <br />
                    {{ formattedTime(match.matchDate) }} 
                </td>
                <td class="sm-none md-none">
                    {{ match.stadium }}
                </td>
                <td class="bold">
                    <div class="country-item cell-right">
                        <span class="bold">{{ match.homeTeam }}</span>
                        <img class="flag" :src="`https://flagsapi.codeaid.io/${match.homeTeam}.png`">
                    </div>
                </td>
                <td class="text-center bold">
                    {{ match.matchPlayed? match.homeTeamScore : '-' }} : {{ match.matchPlayed? match.awayTeamScore : '-' }}
                </td>
                <td class="bold">
                    <div class="country-item cell-left">
                        <img class="flag" :src="`https://flagsapi.codeaid.io/${match.awayTeam}.png`">
                        <span class="bold">{{ match.awayTeam }}</span>
                    </div>
                </td>
                
            </tr>    
        </tbody>
    </table>
    
</template>
<script setup>

import { ref, onMounted } from 'vue';
import HttpRequest from'../services/HttpRequest';
import LeagueService from'../services/LeagueService';

const matches = ref(null);
const leagueService = new LeagueService();

const fetchAllMatchesAfterToken = async () => {
    try {
        
        const response = await HttpRequest.get("v1/getAccessToken");
        const {success, access_token} = response.data;
        if (success) {
            localStorage.setItem("authToken", access_token);
            await fetchAllMatches();
        }            

    } catch (error) {
        console.log(error);
    }
}

const fetchAllMatches = async () => {
    try {

        await leagueService.fetchData();
        matches.value = leagueService.getMatches(); 

    } catch (error) {

        if (error.response.status === 401) {
            fetchAllMatchesAfterToken();
        }

    }

};

const formattedDate = timestamp => {
    const date = new Date(timestamp);
    const day = date.getDate();
    const month = date.getMonth() + 1; 
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
}

const formattedTime = timestamp => {
    const date = new Date(timestamp);
    const hour = date.getHours();
    const minute = date.getMinutes();
    return `${hour}:${minute}`;
}

onMounted(() => {
    fetchAllMatches(); 
});

</script>
  