import { CreatePlanDto } from "../dto/plan.dto";
import { UpdatePlanDto } from "../dto/updatePlan.dto";
import { Plan } from "../schema/plans.schema";

export interface PlanServiceInterface {
    createPlan(createPlanDto: CreatePlanDto): Promise<Plan>;
    findAll(): Promise<Plan[]>;
    findById(id: string): Promise<Plan>;
    findByDate(date: string): Promise<Plan[]>;
    deletePlan(id: string): Promise<Plan>;
    updatePlan(id: string, updatePlanDto: UpdatePlanDto): Promise<Plan>;
}
