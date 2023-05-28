class Exercise {
    constructor(
      id,
      categoryIds,
      title,
      description, 
      difficulty,
      instructions,
      imageUrl,
    ) {
      this.id = id;
      this.categoryIds = categoryIds;
      this.title = title;
      this.description = description;
      this.difficulty = difficulty;
      this.instructions = instructions;
      this.imageUrl = imageUrl;
    }
  }
  
  export default Exercise;