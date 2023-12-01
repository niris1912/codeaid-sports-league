/**
 * A class representing a service that processes the data for match schedule
 * and generates leaderboard.
 * 
 * NOTE: MAKE SURE TO IMPLEMENT ALL EXISITNG METHODS BELOW WITHOUT CHANGING THE INTERFACE OF THEM, 
 *       AND PLEASE DO NOT RENAME, MOVE OR DELETE THIS FILE.  
 * 
 *       ADDITIONALLY, MAKE SURE THAT ALL LIBRARIES USED IN THIS FILE FILE ARE COMPATIBLE WITH PURE JAVASCRIPT
 * 
 */
import axiosInstance from "./HttpRequest";
class LeagueService { 
    
    constructor() {
        this.matches = [];
    }
    
    /**
     * Sets the match schedule.
     * Match schedule will be given in the following form:
     * [
     *      {
     *          matchDate: [TIMESTAMP],
     *          stadium: [STRING],
     *          homeTeam: [STRING],
     *          awayTeam: [STRING],
     *          matchPlayed: [BOOLEAN],
     *          homeTeamScore: [INTEGER],
     *          awayTeamScore: [INTEGER]
     *      },
     *      {
     *          matchDate: [TIMESTAMP],
     *          stadium: [STRING],
     *          homeTeam: [STRING],
     *          awayTeam: [STRING],
     *          matchPlayed: [BOOLEAN],
     *          homeTeamScore: [INTEGER],
     *          awayTeamScore: [INTEGER]
     *      }    
     * ]
     * 
     * @param {Array} matches List of matches.
     */    
    setMatches(matches) {
        this.matches = matches;
    }

    /**
     * Returns the full list of matches.
     * 
     * @returns {Array} List of matches.
     */
    getMatches() {
        return this.matches;
    }

    /**
     * Returns the leaderboard in a form of a list of JSON objecs.
     * 
     * [     
     *      {
     *          teamName: [STRING]',
     *          matchesPlayed: [INTEGER],
     *          goalsFor: [INTEGER],
     *          goalsAgainst: [INTEGER],
     *          points: [INTEGER]     
     *      },      
     * ]       
     * 
     * @returns {Array} List of teams representing the leaderboard.
     */
    getLeaderboard() {
        const teamStats = {};

        // Calculate team statistics based on matches
        this.matches.forEach(match => {
            const { homeTeam, awayTeam, homeTeamScore, awayTeamScore, matchPlayed } = match;

            // Initialize team stats if not present
            if (!teamStats[homeTeam]) {
                teamStats[homeTeam] = { matchesPlayed: 0, goalsFor: 0, goalsAgainst: 0, points: 0 };
            }
            if (!teamStats[awayTeam]) {
                teamStats[awayTeam] = { matchesPlayed: 0, goalsFor: 0, goalsAgainst: 0, points: 0 };
            }

            // Update match played count
            teamStats[homeTeam].matchesPlayed++;
            teamStats[awayTeam].matchesPlayed++;

            // Update goals for and against
            teamStats[homeTeam].goalsFor += homeTeamScore;
            teamStats[homeTeam].goalsAgainst += awayTeamScore;
            teamStats[awayTeam].goalsFor += awayTeamScore;
            teamStats[awayTeam].goalsAgainst += homeTeamScore;

            // Update points based on match result
            if (matchPlayed) {
                if (homeTeamScore > awayTeamScore) {
                    teamStats[homeTeam].points += 3; // Home team won
                } else if (homeTeamScore === awayTeamScore) {
                    teamStats[homeTeam].points += 1;
                    teamStats[awayTeam].points += 1; // Draw
                } else {
                    teamStats[awayTeam].points += 3; // Away team won
                }
            }
        });

        // Convert teamStats to an array for sorting
        const leaderboard = Object.entries(teamStats).map(([teamName, stats]) => ({
            teamName,
            matchesPlayed: stats.matchesPlayed,
            goalsFor: stats.goalsFor,
            goalsAgainst: stats.goalsAgainst,
            points: stats.points
        }));

        // Sort the leaderboard based on specified criteria
        leaderboard.sort((a, b) => {
            // Sort by Points
            if (a.points !== b.points) return b.points - a.points;

            // If points are equal, proceed to tiebreakers
            const aGoalDiff = a.goalsFor - a.goalsAgainst;
            const bGoalDiff = b.goalsFor - b.goalsAgainst;
            if (aGoalDiff !== bGoalDiff) {
                return bGoalDiff - aGoalDiff; // Goal Difference
            }

            if (a.goalsFor !== b.goalsFor) return b.goalsFor - a.goalsFor; // Goals Scored

            // Alphabetical order by team name
            return a.teamName.localeCompare(b.teamName);
        });

        return leaderboard;
    }
    
    /**
     * Asynchronic function to fetch the data from the server.
     */
    async fetchData() {
        
        const response = await axiosInstance.get("v1/getAllMatches");
        const {success, matches} = response.data;
        if (success)
            this.setMatches(matches);
        
    }    
}

export default LeagueService;