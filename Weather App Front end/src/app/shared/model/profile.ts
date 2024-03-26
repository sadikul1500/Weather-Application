import { BasicInfo } from "./basic-info";
import { MoreInfo } from "./more-info";

export interface Profile extends BasicInfo, MoreInfo{
    id?: number,
    userId: number
}