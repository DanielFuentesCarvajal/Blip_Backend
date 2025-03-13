export default interface CommunityDataInterface {
    community_id: number; // ID de la comunidad
    name: string; // Nombre de la comunidad
    description: string; // Descripción
    image: string; //
    members_number: number; // Número de miembros
    category: number; // Nombre de categoría
    privacy: string; // Estado de la comunidad (PUBLICO, PRIVADO)
    creation_date: string; // Fecha de creación
    creator_id: number; // ID del creador
    community_rules: string; // Reglas de la comunidad
    tags : number[];
}
