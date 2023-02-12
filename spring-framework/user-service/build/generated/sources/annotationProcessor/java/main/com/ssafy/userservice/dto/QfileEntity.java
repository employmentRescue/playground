package com.ssafy.userservice.dto;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QfileEntity is a Querydsl query type for fileEntity
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QfileEntity extends EntityPathBase<fileEntity> {

    private static final long serialVersionUID = 1344427065L;

    public static final QfileEntity fileEntity = new QfileEntity("fileEntity");

    public final QBaseTimeEntity _super = new QBaseTimeEntity(this);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdDate = _super.createdDate;

    public final StringPath file_name = createString("file_name");

    //inherited
    public final DateTimePath<java.time.LocalDateTime> modifiedDate = _super.modifiedDate;

    public final StringPath origin_file_name = createString("origin_file_name");

    public final NumberPath<Long> userID = createNumber("userID", Long.class);

    public QfileEntity(String variable) {
        super(fileEntity.class, forVariable(variable));
    }

    public QfileEntity(Path<? extends fileEntity> path) {
        super(path.getType(), path.getMetadata());
    }

    public QfileEntity(PathMetadata metadata) {
        super(fileEntity.class, metadata);
    }

}

