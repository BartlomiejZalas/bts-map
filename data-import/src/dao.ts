import { Bts } from "./domain";

export interface InsertBts {
    (bts: Bts[]): void;
}