const { MongoClient } = require('mongodb');
const { calculateECTier } = require('./utils');
const { calculateOverallECTier } = require('./utils');
const { calculateGPATier } = require('./utils');
const { overallAcademicTier } = require('./utils');
const { calculateCourseworkTier } = require('./utils');

const client = new MongoClient('mongodb://cledge-db2:cXaeZmOW1tk5LKoRLIf26fljO8RN9UYFRThhQlGida5PTascMv6GCVWsjlgx4Qo3uNbMKNyMKb6UACDbprAlag%3D%3D@cledge-db2.mongo.cosmos.azure.com:10255/?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@cledge-db2@', { useNewUrlParser: true, useUnifiedTopology: true });

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const name = (req.query.name || (req.body && req.body.name));
    const responseMessage = name
        ? "Hello, " + name + ". This HTTP triggered function executed successfully."
        : "This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response.";

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: responseMessage
    };

    try {
        await client.connect();
        const database = client.db('colleges');
        const collection = database.collection('college-student-profiles');

        const documents = await collection.find({}).toArray();

        for (let college of documents) {
            console.log(`Processing data for: ${college.college_name}`);
            // Iterate through each student profile
            for (let studentProfile of college.studentProfiles) {
                console.log(`Processing student profile ID: ${studentProfile.id}`);
                let studentInsightsObj = {};
                let allECTierArrayStudent = [];

                // Iterate through each extracurricular activity
                for (let extraCurricular of studentProfile.extracurriculars) {
                    // Call your calculateECTier function with the necessary arguments from the extraCurricular object
                    const ecTier = await calculateECTier(
                        extraCurricular.hoursPerWeek,
                        extraCurricular.weeksPerYear,
                        extraCurricular.numberOfYears,
                        isNaN(parseInt(extraCurricular.awardScale, 10)) ? 0 : parseInt(extraCurricular.awardScale, 10),
                        extraCurricular.awardQuality,
                        extraCurricular.leadership,
                        extraCurricular.impact
                    );
                    allECTierArrayStudent.push(ecTier);
                }

                let userECTier = 0;
                // Call your calculateOverallECTier function with the necessary arguments from the allECTierArrayStudent array
                if (allECTierArrayStudent.length != 0) {
                    userECTier = await calculateOverallECTier(allECTierArrayStudent);
                }
                console.log(`The overal EC tier for student: ${userECTier.toString()}`)


                let totalGPA = 0;
                let totalTerms = 0;
                for (let year of studentProfile.academics.years) {

                    for (let term of year.terms) {
                        totalGPA += term.gpa;
                        totalTerms++;
                    }

                }
                
                let userGPA = totalGPA / totalTerms;

                // TODO: Add the courses tier here - right now defaulting to 5 
                let ovTier = overallAcademicTier(12, 2, userGPA, 5)

                console.log(`The overall academic tier for student: ${ovTier.toString()}`)

                studentInsightsObj = {
                    id: studentProfile.id,
                    college_id: college.college_id,
                    ecTier: userECTier,
                    academicTier: ovTier,
                }
                console.log(`The student insights object: ${JSON.stringify(studentInsightsObj)}`)
            }
        }

        console.log(documents)
        context.res = {
            status: 200,
            body: JSON.stringify(documents),
            headers: {
                'Content-Type': 'application/json'
            }
        };
    } catch (error) {
        context.log.error(`Error: ${error.message}`);
        context.res = {
            status: 500,
            body: 'An error occurred'
        };
    } finally {
        await client.close();
    }
}