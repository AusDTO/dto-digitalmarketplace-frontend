export const navigate = async () => {
    await clickLink('Opportunities');
};

export const selectBrief = async (title) => {
    await clickLink(title);
};

export const applyForAtm = async () => {
    await clickLink('Apply for opportunity');
};
