/**
 * Generate goals for student - Post /goals
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 */
const generateStudentGoals = (req: Request, res: Response) => {
    const studentId = req.body.id;
    // TODO:
    // Retrieve student's data according id
    // Insert the data to the prompt
    // Parse the response
    // Save the goals in the database
    // Return goals
    try {
        // const prompt = 'This should be a prompt for receiving the goals according the data we have';       
        // const goals = await geminiModel.generateContent(prompt);
        // const goalsJson = JSON.parse(
        //   goals.response
        //     .text()
        //     .replace(/^```json\n/, "")
        //     .replace(/\n```$/, "")
        // );
    
        // const studentGoals = new Goal({});

        res.status(200).json({});
      } catch (err) {
        res.status(500).json(err);
      }
}

export default {
    generateStudentGoals
};