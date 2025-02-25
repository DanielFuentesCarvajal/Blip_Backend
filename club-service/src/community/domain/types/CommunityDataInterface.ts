export default interface CommunityDataInterface {
    id: number; // ID de la comunidad
    name: string; // Nombre de la comunidad
    description: string; // Descripción
    image: string; //
    members_number: number; // Número de miembros
    privacy: string; // Estado de la comunidad (PUBLICO, PRIVADO)
    creation_date: string; // Fecha de creación
    creator_id: number; // ID del creador
    community_rules: string; // Reglas de la comunidad
}
