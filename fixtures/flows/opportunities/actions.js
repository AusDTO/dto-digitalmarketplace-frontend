export const navigate = async () => {
    await clickLink('Opportunities');
};

export const selectBrief = async (title) => {
    await clickLink(title);
};

export const applyForAtm = async () => {
    await clickLink('Apply for opportunity');
};

export const checkAppliedForAtm = async (title) => {
    await navigate();
    await selectBrief(title);
    await matchText('p', 'You have already applied for this opportunity.');
}

export const applyForSpecialist = async (number) => {
    if (number === 0) {
        await clickLink('Apply Now');
    } else {
        await clickLink('Edit application');
        await clickLink('Add another specialist');
    }
};

export const applyForTraining = async () => {
    await clickLink('Apply Now');
};
