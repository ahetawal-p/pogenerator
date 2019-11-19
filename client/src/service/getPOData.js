import { sampleData } from '../utils/sampleData'

const wait = ms => new Promise(r => setTimeout(r, ms));

export const getPOData = async (year, month) => {
    await wait(1000);
    return sampleData
}