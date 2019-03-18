export const navigate = async () => {
    await clickLink('Opportunities');
};

export const selectBrief = async (title) => {
    await clickLink(title);
};

export const applyForAtm = async () => {
    await clickLink('Apply for opportunity');
};

export const checkAppliedForAtm = async(title) => {
    await navigate();
    await selectBrief(title);
    await matchText('p', 'You have already applied for this opportunity.');
}
