package com.ssafy.userservice.dto;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QactivitiesEntity is a Querydsl query type for activitiesEntity
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QactivitiesEntity extends EntityPathBase<activitiesEntity> {

    private static final long serialVersionUID = -2142761366L;

    public static final QactivitiesEntity activitiesEntity = new QactivitiesEntity("activitiesEntity");

    public final StringPath activity = createString("activity");

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final StringPath level = createString("level");

    public final NumberPath<Long> member_id = createNumber("member_id", Long.class);

    public QactivitiesEntity(String variable) {
        super(activitiesEntity.class, forVariable(variable));
    }

    public QactivitiesEntity(Path<? extends activitiesEntity> path) {
        super(path.getType(), path.getMetadata());
    }

    public QactivitiesEntity(PathMetadata metadata) {
        super(activitiesEntity.class, metadata);
    }

}

