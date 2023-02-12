package com.ssafy.userservice.dto;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QactivitiesEntity is a Querydsl query type for activitiesEntity
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QactivitiesEntity extends EntityPathBase<activitiesEntity> {

    private static final long serialVersionUID = -2142761366L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QactivitiesEntity activitiesEntity = new QactivitiesEntity("activitiesEntity");

    public final QBaseTimeEntity _super = new QBaseTimeEntity(this);

    public final StringPath activity = createString("activity");

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdDate = _super.createdDate;

    public final StringPath level = createString("level");

    public final QMemberOftenEntity memberOften;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> modifiedDate = _super.modifiedDate;

    public QactivitiesEntity(String variable) {
        this(activitiesEntity.class, forVariable(variable), INITS);
    }

    public QactivitiesEntity(Path<? extends activitiesEntity> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QactivitiesEntity(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QactivitiesEntity(PathMetadata metadata, PathInits inits) {
        this(activitiesEntity.class, metadata, inits);
    }

    public QactivitiesEntity(Class<? extends activitiesEntity> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.memberOften = inits.isInitialized("memberOften") ? new QMemberOftenEntity(forProperty("memberOften")) : null;
    }

}

