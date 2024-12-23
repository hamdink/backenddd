import { IsEnum } from 'class-validator';
import { Status } from '../../common/enums/status.enum';

export class UpdateLivraisonStatusDto {
    @IsEnum(Status, {
        message: 'status must be one of the following values: En attente, À la livraison, Livré, Annulé, Retardé',
    })
    status: Status;
}
