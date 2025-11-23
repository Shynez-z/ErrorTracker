export interface Test {
    id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface CreateTestDto {
    name: string;
}

export interface UpdateTestDto {
    name?: string;
}
